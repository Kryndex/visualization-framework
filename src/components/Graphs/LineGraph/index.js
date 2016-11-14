import React from "react";
import AbstractGraph from "../AbstractGraph";
import tabify from "../../../utils/tabify";

import {
    axisBottom,
    axisLeft,
    extent,
    format,
    line,
    nest,
    scaleLinear,
    scaleTime,
    select,
} from "d3";

export default class LineGraph extends AbstractGraph {

    render() {

        const { response, width, height } = this.props;

        if (!response || response.error)
            return;

        const data = tabify(response.results);

        const {
          xColumn,
          yColumn,
          linesColumn,
          margin: { top, bottom, left, right },
          yTickGrid,
          yTickSizeInner,
          yTickSizeOuter,
          yTickFormat,
          yTicks,
          xTickGrid,
          xTickSizeInner,
          xTickSizeOuter,
          xTickFormat,
          xTicks,
          stroke,
        } = this.getConfiguredProperties();

        const xScale = scaleTime()
          .domain(extent(data, function (d){ return d[xColumn]; }));
        const yScale = scaleLinear()
          .domain(extent(data, function (d){ return d[yColumn] }));

        const innerWidth = width - left - right;
        const innerHeight = height - top - bottom;

        xScale.range([0, innerWidth]);
        yScale.range([innerHeight, 0]);

        const xAxis = axisBottom(xScale)
          .tickSizeInner(xTickGrid ? -innerHeight : xTickSizeInner)
          .tickSizeOuter(xTickSizeOuter);

        if(xTickFormat){
            xAxis.tickFormat(format(xTickFormat));
        }

        if(xTicks){
            xAxis.ticks(xTicks);
        }

        const yAxis = axisLeft(yScale)
          .tickSizeInner(yTickGrid ? -innerWidth : yTickSizeInner)
          .tickSizeOuter(yTickSizeOuter);

        if(yTickFormat){
            yAxis.tickFormat(format(yTickFormat));
        }

        if(yTicks){
            yAxis.ticks(yTicks);
        }

        const lineGenerator = line()

          .x(function(d) { return xScale(d[xColumn]); })
          .y(function(d) { return yScale(d[yColumn]); });

        const linesData = nest()
          .key((d) => linesColumn ? d[linesColumn] : "Line")
          .entries(data);

        const scale = this.scaleColor(data);

        return (
            <div className="bar-graph">
                <svg width={width} height={height}>
                    <g transform={ `translate(${left},${top})` } >
                        <g
                            key="xAxis"
                            ref={ (el) => select(el).call(xAxis) }
                            transform={ `translate(0,${innerHeight})` }
                        />
                        <g
                            key="yAxis"
                            ref={ (el) => select(el).call(yAxis) }
                        />
                        {linesData.map(({key, values}, i) =>
                            <path
                                key={ key }
                                fill="none"
                                stroke={ linesColumn ? scale(i) : stroke.color }
                                strokeWidth={ stroke.width }
                                d={ lineGenerator(values) }
                            />
                        )}
                    </g>
                </svg>
            </div>
        );
    }
}
LineGraph.propTypes = {
  configuration: React.PropTypes.object,
  response: React.PropTypes.object
};
