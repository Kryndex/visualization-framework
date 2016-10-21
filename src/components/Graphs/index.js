import SimpleTextGraph from "./SimpleTextGraph";

import BarGraph from "./BarGraph/index";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import Table from "./Table";

import { theme } from "../../theme";

/*
    Stores all graphs.
*/
let registry = {
    SimpleTextGraph,
    BarGraph,
    LineGraph,
    Table,
    PieGraph,
};

/*
    Registers a new graph for a given name
*/
const register = function (graph, name) {
    registry[name] = graph;
}

/*
    Get the graph component registered for the given name
*/
const getGraphComponent = function (name) {
    if (!(name in registry))
        throw new Error("No graph named " + name + " has been registered yet!" );

    return registry[name];
}


// Define all default properties for graphs
const defaults = {
    margin: {
        top: 15,
        bottom: 20,
        left: 30,
        right: 20
    },
    padding: 0.1,
    yTickGrid: true,
    yTickSizeInner: 6,
    yTickSizeOuter: 0,
    xTickGrid: false,
    xTickSizeInner: 6,
    xTickSizeOuter: 0,
    dateHistogram: false,
    interval: "30s",
    colors: [theme.palette.blueColor],
    fontColor: theme.palette.blackColor,
    stroke: {
        color: theme.palette.whiteColor,
        width: "2px"
    },
}

const getDefaultProperties = (properties) => {
    return Object.assign({}, defaults, properties);
};


export const GraphManager = {
    register: register,
    getGraphComponent: getGraphComponent,
    getDefaultProperties: getDefaultProperties,
}