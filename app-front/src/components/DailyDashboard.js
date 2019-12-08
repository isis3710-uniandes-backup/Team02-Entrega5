import React, { Component } from "react";
import { data } from "../params";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";
const axios = require("axios");

class DailyDashboard extends Component {
  state = {
    chartData: "",
    chartData2: ""
  };

  componentDidMount() {
    this.getChartData();
  }

  graficar(){
        var data1 = this.state.chartData;
        console.log(data1);
        var data2 = this.state.chartData2;
        if(data1===''||data==={}){
            return (
                <h3>
                  <FormattedMessage id="dashboard.noData" />
                </h3>
              );
        }
        else{

        this.update(data1,data2);
        }
        
      }

  update(data,data2) {
    // set the dimensions and margins of the graph
    var width = 450;
    var height = 450;
    var margin = 40;
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function(d) {
      return d.value;
    });
    var data_ready = pie(d3.entries(data));
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function(d) {
        return data2[d.data.key];
      })
      .attr("transform", function(d) {
        return "translate(" + arcGenerator.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 17);
  }

  getChartData = () => {
    const fechaini = this.props.fechaIni;
    const fechaFin = this.props.fechaFin;
    //console.log(fechaini);
    //console.log(fechaFin);
    axios({
      method: "POST",
      url: data.getCostTime,
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      data: {
        inicialTime: fechaini,
        finalTime: fechaFin
      }
    }).then(res => {
      let categoriesData = {};
      let categoriesData2 = {};
      //Calcular el total de cada categoria posible
      for (let i=0;i<res.data.length;i++) {
        //console.log(expense.amount);
        categoriesData[i] = res.data[i].amount;
        categoriesData2[i] = res.data[i].category;
      }
      //console.log(categoriesData);
      this.setState({ chartData: categoriesData });
      this.setState({ chartData2: categoriesData2 });
      //console.log(this.state.chartData);
    });
  };

  getData() {
    let data = [];
    data.push(["Expenditure", "Amount"]);

    for (let key in this.state.chartData) {
      if (this.state.chartData[key] > 0) {
        //console.log("Categoria SI tiene > 0");
        data.push([key, this.state.chartData[key]]);
      }
    }
    //console.log(data);
    return data;
  }

  render() {
    if (this.props.username !== undefined) {
      return (
        <div className="container-float">
          <div className="card shadow chart-card">
            <div className="card-header text-center">
              <h3>
                Welcome back{" "}
                {this.props.username.charAt(0).toUpperCase() +
                  this.props.username.slice(1)}
                !
              </h3>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-12">
                <div id="chart">{this.graficar()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No ha iniciado sesión</div>;
    }
  }
}

export default DailyDashboard;
