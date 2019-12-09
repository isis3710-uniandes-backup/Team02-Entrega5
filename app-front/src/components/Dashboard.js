import React, { Component } from "react";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";
import "../css/signin.css";
var svg;
var radius;

class Dashboard extends Component {
  state = {
    chartData: "",
    filteredData: this.props.data,
    showFiltered: false,
    cont: 1
  };

  componentDidMount(){
      // set the dimensions and margins of the graph
var width = 450;
var height = 450;
var margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
 radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
 svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  }

  clickFilter = () => {
    //console.log(this.props.data);
    //this.refs.description.value = '';
    let filteredData = [];
    //console.log(filteredData);

    for (let i of this.props.data) {
      //console.log(this.refs["Laundry"].checked);
      if (i[0] === "Expenditure") {
        continue;
      }
      //console.log(i[0]);
      //console.log(this.refs[i[0]]);
      if (this.refs[i[0]].checked) {
        //console.log(i);
        filteredData.push(i);
      }
    }
    if (filteredData.length > 0) {
      //console.log("No hay longitud");
      //Le agregamos cabecera
      filteredData.unshift(this.props.data[0]);
      //console.log(filteredData);
      //Le hacemos setSate a filteredData
      this.setState({ filteredData: filteredData });
      this.setState({ showFiltered: true });
    } else {
      this.setState({ filteredData: filteredData });
      this.setState({ showFiltered: false });
    }
  };

  clickClearFilter = () => {
    /*
        this.props.data.filter(element => element[0] !== "Expenditure").map((element) => {
            this.refs[element[0]].checked = false;
        })*/

    let aux = this.props.data.filter(element => element[0] !== "Expenditure");
    for (let element of aux) {
      this.refs[element[0]].checked = false;
    }

    this.setState({ showFiltered: false });
  };

  checkData() {
    if (!this.state.showFiltered) {
      return this.props.data;
    } else {
      return this.state.filteredData;
    }
  }

  update(data,data2) {


// set the color scale
var color = d3
  .scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);
    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .value(function(d) {
        return d.value;
      })
      .sort(function(a, b) {
        console.log(a);
        return d3.ascending(a.key, b.key);
      }); // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data));

    // map to data
    var u = svg.selectAll("path").data(data_ready);
    var u2= svg.selectAll("text").data(data_ready);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u.enter()
      .append("path")
      .merge(u)
      .transition()
      .duration(1000)
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(0)
          .outerRadius(radius)
      )
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);
      
      
     var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
     u2
      .enter()
      .append('text')
      .merge(u2)
      .transition()
      .text(function(d){ return data2[d.data.key]})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .attr("font-weight",900)
      .style("text-anchor", "middle")
      .style("font-size", 17)
    u.exit().remove();
    u2.exit().remove();
  }

  checkTitle() {
      if (this.props.data.length > 1) {

        var data1 = this.checkData();
        let data = [];
        let data2 = [];
        for (let i = 1; i < data1.length; i++) {
          data.push(data1[i][1]);
          data2.push(data1[i][0]);
        }
        this.update(data,data2);
      } else {
        return (
          <h3>
            <FormattedMessage id="dashboard.noData" />
          </h3>
        );
      }

    
  }

  render() {
    return (
      <div className="container-float">
        <link
          href="https://fonts.googleapis.com/css?family=Karla|Rubik&display=swap"
          rel="stylesheet"
        ></link>
        <div className="row">
          <div className="col-9">
            <div className="card shadow bg-light">
              <div className="card-header text-center">
                <h1 id="bienv">
                  <FormattedMessage id="dashboard.welcome" />{" "}
                  {this.props.username.charAt(0).toUpperCase() +
                    this.props.username.slice(1)}
                  !
                </h1>
              </div>
              <div className="card-body" id="card">
                <div className="row justify-content-center"></div>
                <div className="row justify-content-center" id="my_dataviz">
                  {this.checkTitle()}
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="cards shadow bg-light">
              <div className="card-header">
                <h2 id="filter">
                  <FormattedMessage id="dashboard.filter" />
                </h2>
              </div>
              <div className="card-body">
                {this.props.data
                  .filter(element => element[0] !== "Expenditure")
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="custom-control custom-checkbox mylabel"
                    >
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={item[0]}
                        ref={item[0]}
                      ></input>
                      <label className="custom-control-label" htmlFor={item[0]}>
                        {item[0]}
                      </label>
                    </div>
                  ))}

                <hr></hr>
                <div className="row text-center">
                  <div className="col-6">
                    <button
                      className="btn button-rounded btn-danger btn-sm mylabel"
                      onClick={this.clickClearFilter}
                    >
                      <FormattedMessage id="dashboard.clear" />
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      value="Submit"
                      className="btn button-rounded button-blue btn-sm mylabel"
                      onClick={this.clickFilter}
                    >
                      <FormattedMessage id="dashboard.filter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
