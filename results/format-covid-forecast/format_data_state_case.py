import datetime
import pandas as pd
import csv
import urllib.request
import io

FORECAST_DATE = datetime.datetime(2020, 7, 12)
FIRST_WEEK = datetime.datetime(2020, 7, 18)
INPUT_FILENAME_STATE = "us_forecasts_quarantine_20.csv"
INPUT_FILENAME_GLOBAL = "global_forecasts_quarantine_20.csv"
OUTPUT_FILENAME = FORECAST_DATE.strftime("%Y-%m-%d") + "-USC-SI_kJalpha.csv"
COLUMNS = ["forecast_date", "target", "target_end_date", "location", "type", "quantile", "value"]
ID_STATE_MAPPING = {}
STATE_ID_MAPPING = {}

def load_state_id_mapping():
    """
    Return a mapping of <state name, state id>.
    """

    MAPPING_CSV = "./locations_state.csv"
    with open(MAPPING_CSV) as f:
        reader = csv.reader(f)
        state_id_mapping = {}
        
        # Skip the header
        next(reader)

        for row in reader:
            state_id = row[1]
            state_name = row[2]
            state_id_mapping[state_name] = state_id
        
        return state_id_mapping


def load_id_state_mapping():
    """
    Return a mapping of <state id, state name>.
    """

    MAPPING_CSV = "./locations.csv"
    with open(MAPPING_CSV) as f:
        reader = csv.reader(f)
        id_state_mapping = {}
        
        # Skip the header
        next(reader)

        for row in reader:
            state_id = row[1]
            state_name = row[2]
            id_state_mapping[state_id] = state_name
        
        return id_state_mapping


def load_csv(input_filename_state, input_filename_global):
    """
    Read our forecast reports and return a dictionary structuring of <date_str, <state_id, value>>
    e.g.
    {
        "2020-06-22": {
            '10': 2000.0,
            '11': 3000.0,
            ...
        },

        "2020-06-23": {
            '10': 800.0,
            '11': 900.0,
            ...
        },
        ...
    }
    """
    dataset = {}
    with open(input_filename_state) as f:
        reader = csv.reader(f)
        header = next(reader, None)

        for i in range(2, len(header)):
            date_str = header[i]
            # Initialize the dataset entry on each date.
            dataset[date_str] = {}
        
        for row in reader:
            state = row[1]
            
            # Skip the state if it is not listed in reichlab's state list.
            if state not in STATE_ID_MAPPING:
                continue

            state_id = STATE_ID_MAPPING[state]
            for i in range(2, len(header)):
                date_str = header[i]
                val = float(row[i])
                dataset[date_str][state_id] = val

    with open(input_filename_global) as f:
        reader = csv.reader(f)
        header = next(reader, None)

        
        for row in reader:
            country = row[1]
            # Skip other countries.
            if not country == "US":
                continue

            for i in range(2, len(header)):
                date_str = header[i]
                val = float(row[i])
                dataset[date_str]["US"] = val
    
    return dataset


def generate_new_row(forecast_date, target, target_end_date, 
                    location, type, quantile, value):
    """
    Return a new row to be added to the pandas dataframe.
    """
    new_row = {}
    new_row["forecast_date"] = forecast_date
    new_row["target"] = target
    new_row["target_end_date"] = target_end_date
    new_row["location"] = location
    new_row["type"] = type
    new_row["quantile"] = quantile
    new_row["value"] = value
    return new_row



def add_to_dataframe(dataframe, forecast):
    """
    Given dataframe and forecast, generate a pandas dataframe of incident cases.
    """
    # Write incident forecasts.
    cum_week = 0
    forecast_date_str = FORECAST_DATE.strftime("%Y-%m-%d")
    for target_end_date_str in sorted(forecast.keys()):
        target_end_date = datetime.datetime.strptime(target_end_date_str, "%Y-%m-%d")
        # Terminate the loop after 8 weeks of forecasts.
        if cum_week >= 8:
            break

        # Skip forecasts before the forecast date.
        if target_end_date <= FORECAST_DATE:
            continue

        if target_end_date >= FIRST_WEEK and target_end_date.weekday() == 5:
            cum_week += 1
            for state_id in forecast[target_end_date_str].keys():
                target = str(cum_week) + " wk ahead inc case"
                last_week_date = target_end_date - datetime.timedelta(7)
                last_week_date_str = last_week_date.strftime("%Y-%m-%d")
                
                # For the first week, we use first Saturday - forecast day as the incident casts.
                if target_end_date == FIRST_WEEK and state_id in forecast[forecast_date_str]:
                    dataframe = dataframe.append(
                        generate_new_row(
                            forecast_date=forecast_date_str,
                            target=target,
                            target_end_date=target_end_date_str,
                            location=str(state_id),
                            type="point",
                            quantile="NA",
                            value=forecast[target_end_date_str][state_id]-forecast[forecast_date_str][state_id]
                        ), ignore_index=True)
                
                elif last_week_date_str in forecast and state_id in forecast[last_week_date_str]:
                    dataframe = dataframe.append(
                        generate_new_row(
                            forecast_date=forecast_date_str,
                            target=target,
                            target_end_date=target_end_date_str,
                            location=str(state_id),
                            type="point",
                            quantile="NA",
                            value=forecast[target_end_date_str][state_id]-forecast[last_week_date_str][state_id]
                        ), ignore_index=True)

    return dataframe


# Main function
if __name__ == "__main__":
    STATE_ID_MAPPING = load_state_id_mapping()
    ID_STATE_MAPPING = load_id_state_mapping()
    print("loading forecast...")
    forecast = load_csv(INPUT_FILENAME_STATE, INPUT_FILENAME_GLOBAL)
    dataframe = pd.read_csv(OUTPUT_FILENAME, na_filter=False)
    dataframe = add_to_dataframe(dataframe, forecast)
    print("writing files...")
    dataframe.to_csv(OUTPUT_FILENAME, index=False)
    print("done")