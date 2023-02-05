<div><img align=left width=200px height=120px src="https://github.com/geethakan/belly-button-challenge/blob/main/Images/belly_button_biodiversity.jpg">

# Interactive Visualization with Javascript D3 Library
Data Driven Documents (D3) used to build build an interactive dashboard to explore the Belly Button Biodiversity dataset.

## Dataset
Data is read from [URL](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json) and stored in global variable for use in functions. 
Dataset is an array with a single element comprised of: <br>
 * names: an array of test subject Ids
 * metadata: array of dictionaries holding demograhic information about the subject
 * samples: array of dictionaries (one per Subject) holding details about:
    * id: Subject Id
    * otu_ids: Ids of bacteria found in culture
    * sample_values: value of sample taken
    * otu_labels: names of bacteria found in the culture

## Dashboard
 * Dropdown loaded with test Subject IDs (defaulted to first subject from drop-down)
 * Horizontal bar chart listing the top 10 sample values with otus (ascending on sample value)
 * Bubble chart with all cultures for the test subject. Bubble size based on sample value and color based on OTU id with color scale to show differnt cultures. 
 <div><img src="https://github.com/geethakan/belly-button-challenge/blob/main/Images/dashboard.png"</div>
