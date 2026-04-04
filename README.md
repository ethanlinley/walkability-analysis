# San Diego Walkability Analysis

**By Ethan Linley**

## Project Description
This project evaluates walkability across San Diego using a GIS-based index developed at the census block group level. The final web application presents both a modeled walkability surface and an interactive dataset exploration map, allowing users to examine how access to amenities and pedestrian-supportive infrastructure varies across the city.

## Background
Walkability is an important measure of urban livability because it reflects how easily residents can reach daily needs without relying entirely on automobiles. Highly walkable areas tend to provide closer access to destinations such as food, retail, education, health services, and leisure opportunities, while also supporting safer and more connected pedestrian movement.

This project was designed to explore how spatial patterns of amenities, roads with walking infrastructure, and population characteristics combine to shape neighborhood-level walkability in San Diego. The result is a comparative index that highlights which block groups are more or less supportive of walking.

## Methods
The walkability index was calculated at the census block group level using a weighted combination of spatial variables.

First, points of interest (POIs) were collected and aggregated by block group area. These POIs represented amenities that support everyday pedestrian access, including categories such as food, retail, education, health services, and leisure.

Second, road data were filtered to include only roads with pedestrian-supportive infrastructure, such as sidewalks. The total amount of these walkable roads was then calculated relative to the area of each block group.

These two variables were combined into an index weighted at **60% POIs** and **40% walkable road coverage**. Population statistics were also considered in order to account for differences in density and demand. The final result was normalized to a **0–1 scale**, where **0 indicates low walkability** and **1 indicates high walkability**.

## Dataset
The project uses multiple spatial datasets to build and visualize the walkability index:

- **Census block groups** from census.gov used as the unit of analysis
- **Points of interest (POIs)** from Open Street Maps representing destinations relevant to daily life
- **Road network data** from SANDAG filtered to include roads with walking infrastructure
- **Population statistics** from census.gov used to refine the final index
- **Web map layers** published for interactive exploration through ArcGIS Online

## Results
The analysis shows that walkability is strongest in the more central and urbanized parts of San Diego, where higher destination density and more connected pedestrian-supportive infrastructure are concentrated. Lower walkability values are more common in peripheral and suburban areas, where destinations are more dispersed and walkable road coverage is lower.

The final website presents these results in two ways:
1. A **Leaflet map** displaying the normalized walkability index
2. An **ArcGIS Online interactive map** for exploring the full underlying dataset

## Live Web Map
[View the live project website here](PASTE-YOUR-GITHUB-PAGES-LINK-HERE)

## Repository Structure
```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── data/
    ├── blockgroups.geojson
    └── poi.json
