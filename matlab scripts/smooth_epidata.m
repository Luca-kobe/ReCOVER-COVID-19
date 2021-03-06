function [data_4_s] = smooth_epidata(data_4, smooth_factor)
%SMOOTH_EPIDATA removes outliers and smoothes
deldata = diff(data_4');
if isnumeric(smooth_factor)
    cleandel = filloutliers(deldata, 'center', 'movmean', smooth_factor)';
    data_4_s = [data_4(:, 1) cumsum(movmean(cleandel, smooth_factor, 2), 2)];
else
    cleandel = filloutliers(deldata, 'center', 'movmean', 14);
    t = sgolayfilt(cleandel, 1, 7)';
    data_4_s = [data_4(:, 1)  cumsum(movmean(t, 7, 2), 2)];
end
end

