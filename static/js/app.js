const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
var samplesJson = [];


// Function to build demographic infomation for the test Subject
function buildSubjectDetails(sId) {

    let demographicInfo = d3.select('#sample-metadata');
    
    let subjectInfo = samplesJson.metadata;
    // filter metadata of the subject
    let filteredMeta = subjectInfo.filter(row => row.id == sId)[0];
    console.log("subjectDemo", filteredMeta);

    // clear any earlier values before loading new info
    d3.select('#sample-metadata.panel-body').selectAll("p").remove();
    // populate demographic panel with filtered metadata for the subject
    Object.entries(filteredMeta).forEach(([key, value]) => {        
        demographicInfo.append("p").text(`${key}: ${value}`)
    });
};


// Function to build bar chart and bubble chart for subject ID passed
function buildCharts(sId) {
    
    // Get samples from samplesJson
    let sampleData = samplesJson.samples;
    
    // filter sample for the subject ID
    let filteredData = sampleData.filter(row => row.id == sId)[0];
    console.log("subjectBar",filteredData);
    
    // slice top 10 for plotting - repeat for sample_values (x-axis), otu_ids (y-axis) and otu_labels (hover text)
    // order reversed to show in ascending order of sample_values
    let sV = filteredData.sample_values;
    let sampleValues = sV.slice(0, 10).reverse();
    console.log("Top 10 Sample Values", sampleValues);

    let oId = filteredData.otu_ids;
    let otuIds = oId.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();    
    console.log("Top 10 OTU_ID", otuIds);

    let oLabel = filteredData.otu_labels;
    //y-axis label to be made alpha to avoid plot taking numeric values - chart does not display well
    let otuLabels = oLabel.slice(0, 10).reverse();
    console.log("Top 10 Labels", otuLabels);
    
    // Plot horizontal bar chart
    let trace1 = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
    };
    let traceData1 = [trace1];
    let layout1 = {
        title: "Top 10 Bacteria Samples Of Test Subject",
        xaxis: { title: "Sample Value"},
        yaxis: { title: "Taxonomic Unit Identity"}
    };
    Plotly.newPlot("bar", traceData1, layout1);

    // Plot bubble chart (try other colorscales like Viridis/Earth/Electric/Picnic)
    let trace2 = {
        x: oId,
        y: sV,
        type: "scatter",
        text: oLabel,
        mode: "markers",
        marker: { size: sV, sizeref: 1.2, color: oId, colorscale: 'Portland'}
    };
    
    let traceData2 = [trace2];
    let layout2 = {
        xaxis: {title: "OTU ID" }
    };

    Plotly.newPlot("bubble", traceData2, layout2);
};

// function to build data based on dropdown value change of subject ID
function optionChanged(sId) {

    console.log("Subject changed to ", sId);
    buildCharts(sId);
    buildSubjectDetails(sId);
};

// Init function; gets current value of dropdown menu and displays data in dashboard; builds charts for first (default) subject
function init() {

    var dropDownMenu = d3.select('#selDataset');

    // Fetch data from url and save in global variable for use in other functions
    d3.json(url).then(function(data) {
        samplesJson = data;
        console.log(samplesJson);

        let subjectIds = samplesJson.names;
        
        // Fill drop-down from values of names     
        subjectIds.forEach(subjectId => {
            dropDownMenu.append('option').text(subjectId).property("value", subjectId);
        });

        // Populate Demographic info and plot horizontal bar chart and bubble chart for the first subject (default)
        buildCharts(subjectIds[0]);
        buildSubjectDetails(subjectIds[0]);
    });     
    
};

init();