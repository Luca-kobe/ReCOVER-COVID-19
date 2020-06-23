# Generated by Django 3.0.4 on 2020-06-11 18:42

from django.db import migrations
from typing import List
import urllib.request
import urllib.error
import datetime
import io
import csv

# Static model predictions from other universities/research labs.
class StaticForeignModel:
    def __init__(self, 
                 us_death_prediction_url: str,
                 name: str,
                 description: str = ""):
        self.us_death_prediction_url = us_death_prediction_url
        self.name = name
        self.description = description

STATIC_FOREIGN_MODELS = [
    StaticForeignModel(
        us_death_prediction_url="https://raw.githubusercontent.com/reichlab/covid19-forecast-hub/master/data-processed/CU-select/2020-06-18-CU-select.csv",
        name="Columbia University - Select (US state level death prediction only)",
        description="This metapopulation county-level SEIR model makes projections of future COVID-19 deaths. \
        The predictions are provided by the Shaman Lab at Columbia University. \
        More info on https://github.com/shaman-lab/COVID-19Projection."
    ), 

    StaticForeignModel(
        us_death_prediction_url="https://raw.githubusercontent.com/reichlab/covid19-forecast-hub/master/data-processed/UCLA-SuEIR/2020-06-21-UCLA-SuEIR.csv",
        name="UCLA - SuEIR (US state level death prediction only)",
        description="The SuEIR model is a variant of the SEIR model considering both untested and unreported cases. \
        The model takes reopening into consideration and assumes that the contact rate will increase after the reopen.\
        The predictions are provided by the UCLA Statistical Machine Learning Lab. \
        More info on https://github.com/reichlab/covid19-forecast-hub/tree/master/data-processed/UCLA-SuEIR."
    ),

    StaticForeignModel(
        us_death_prediction_url="https://raw.githubusercontent.com/reichlab/covid19-forecast-hub/master/data-processed/MIT_CovidAnalytics-DELPHI/2020-06-22-MIT_CovidAnalytics-DELPHI.csv",
        name="MIT - DELPHI (US state level death prediction only)",
        description="This model makes predictions for future cases based on a heavily modified SEIR model taking \
        into account underdetection and government intervention. The predictions are provided by the COVIDAnalytics Research Team at MIT. \
        More info on https://github.com/COVIDAnalytics/DELPHI."
    ), 

    StaticForeignModel(
        us_death_prediction_url="https://raw.githubusercontent.com/reichlab/covid19-forecast-hub/master/data-processed/JHU_IDD-CovidSP/2020-06-14-JHU_IDD-CovidSP.csv",
        name="JHU - IDD (US state level death prediction only)",
        description="County-level metapopulation model with commuting and stochastic SEIR disease dynamics. \
        The predictions are provided by the Johns Hopkins ID Dynamics COVID-19 Working Group. \
        More info on https://github.com/HopkinsIDD/COVIDScenarioPipeline."
    )
]


def load_csv(apps, url, state_mapping):
    """
    Reads the given csv url and <state id, state name> mapping, 
    returns a list of Covid19PredictionDataPoint objects. 
    Only the date, area, and val fields on the objects are set. Note
    that the objects have not been saved into the database yet.
    :param apps: Django apps object.
    :param path: Path to CSV with prediction data.
    :return: List of Covid19PredictionDataPoint objects (NOT SAVED YET).
    """
    Area = apps.get_model('model_api', 'Area')
    Covid19PredictionDataPoint = apps.get_model(
        'model_api', 'Covid19PredictionDataPoint')

    try:
        f = io.StringIO(urllib.request.urlopen(url).read().decode('utf-8'))
        reader = csv.reader(f)
        header = next(reader, None)

        # Because different csv files have different column arrangements,
        # find out the index the columns containing different data fields first.
        location_col = -1
        date_col = -1
        target_col = -1
        type_col = -1
        value_col = -1

        for i in range(0, len(header)):
            if (header[i] == "location"):
                location_col = i
            elif (header[i] == "target_end_date"):
                date_col = i
            elif (header[i] == "target"):
                target_col = i
            elif (header[i] == "type"):
                type_col = i
            elif (header[i] == "value"):
                value_col = i

        data = []

        for row in reader:
            # Skip the row of quantile-type prediction or not cumulative type.
            if (row[type_col] != "point"  or "cum death" not in row[target_col]):
                continue

            area = None
            state = ""
            country = ""

            if row[location_col] == "US":
                country = "US"
            else:
                country = "US"
                state_id = int(row[location_col])
                state = state_mapping[state_id]

            # Try to find the corresponding area.
            try:
                area = Area.objects.get(country=country, state=state)
            except Area.DoesNotExist:
                msg = "Could not find the area for country '{0}'".format(
                    country)
                if state:
                    msg += " and state '{0}'".format(state)
                msg += ' in model_api_area. Skip this area.'
                print(msg)
                continue

            except Area.MultipleObjectsReturned:
                msg = "Found multiple areas for country '{0}'".format(
                    country)
                if state:
                    msg += " and state '{0}'".format(state)
                msg += ' in model_api_area. Skip this area.'
                print(msg)
                continue
            
            raw_date = row[date_col]
            date = datetime.datetime(*[int(item) for item in raw_date.split('-')])

            # Skip invalid values.
            raw_val = row[value_col]
            if raw_val in ['NaN', '-Inf', 'Inf']:
                continue
            
            # Skip negative values.
            val = int(float(raw_val))
            if val < 0:
                continue
            
            data.append(Covid19PredictionDataPoint(
                area=area,
                date=date,
                val=val
            ))

        return data

    except urllib.error.HTTPError as httpe:
        print("A HttpError is found when loading data from" + url)
        return []
    except urllib.error.URLError as urle:
        print("A URLError is found when loading data from" + url)
        return []
    

def load_state_mapping(apps):
    """
    Return a mapping of <state id, state name> from 
    https://github.com/reichlab/covid19-forecast-hub/blob/master/data-locations/locations.csv.
    """
    try:
        MAPPING_CSV_URL = "https://raw.githubusercontent.com/reichlab/covid19-forecast-hub/master/data-locations/locations.csv"
        f = io.StringIO(urllib.request.urlopen(MAPPING_CSV_URL).read().decode('utf-8'))
        reader = csv.reader(f)
        state_mapping = {}
        
        # Skip first two lines
        next(reader)
        next(reader)

        for row in reader:
            state_id = int(row[1])
            state_name = row[2]
            state_mapping[state_id] = state_name
        
        return state_mapping
    
    except urllib.error.HTTPError as httpe:
        print("A HttpError is found when loading state_ids and states mapping.")
        raise
    except urllib.error.URLError as urle:
        print("A URLError is found when loading data state_ids and states mapping.")
        raise


def load_covid19_foreign_predictions(apps, schema_editor):
    Covid19Model = apps.get_model('model_api', 'Covid19DeathModel')
    Covid19PredictionDataPoint = apps.get_model(
        'model_api', 'Covid19PredictionDataPoint')

    print()
    state_mapping = load_state_mapping(apps)
    for static_model in STATIC_FOREIGN_MODELS:
        print("Loading model: " + static_model.name)
    
        # Create an entry for the model in the database.
        covid19_model = Covid19Model(
            name=static_model.name,
            description=static_model.description)
        covid19_model.save()

        new_predictions = load_csv(apps, static_model.us_death_prediction_url, state_mapping)
        # Sort the data according to its datetime.
        new_predictions.sort(key=lambda p: p.date)

        for p in new_predictions:
            p.model = covid19_model
            p.social_distancing = True
            # Skip repetitive prediction points.
            if Covid19PredictionDataPoint.objects.filter(
                    model=p.model,
                    social_distancing=p.social_distancing,
                    area=p.area,
                    date=p.date 
                ).count() == 1:
                continue
            p.save()


def delete_covid19_predictions(apps, schema_editor):
    Covid19PredictionDataPoint = apps.get_model(
        'model_api', 'Covid19PredictionDataPoint')
    Covid19Model = apps.get_model('model_api', 'Covid19Model')

    # Clear all prediction data points.
    Covid19PredictionDataPoint.objects.all().delete()
    # Clear all models.
    Covid19Model.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('model_api', '0008_load_predictions'),
    ]

    operations = [
        migrations.RunPython(load_covid19_foreign_predictions,
                            delete_covid19_predictions)
    ]
