import React, { Component } from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { data } from "../params";
import { categories } from "../categories";

const axios = require("axios");

class Expenditure extends Component {

    state = {
        categories: categories,
        
    }

    handleSubmit(event) {
        event.preventDefault();
        //Se atrapan los valores digitados por el usuario
        const category = event.target.category.value;
        const description = event.target.description.value;
        const date = event.target.date.value;
        const amount = event.target.amount.value;

        console.log(category);
        console.log(description);
        console.log(date);
        console.log(amount);

        if (category !== '' && description !== '' && date !== '' && amount) {
            // Ver si agregarle el tiempo a la fecha


            axios({
                method: "POST",
                url: data.addCost,
                headers: { authorization: "Bearer " + localStorage.getItem("token") },
                data: {     
                    date: date,
                    category: category,
                    amount: amount,
                    description: description
                }
            }).then(res => {
                console.log(res);
                // Reload componente Dashboard:
                this.props.refreshData();
            });

        } else {
            //alert("Se deben llenar todos los campos");
            ToastsStore.error("Se deben llenar todos los campos")
        }
    }

    clickCancel = ()=>{
        this.refs.description.value = '';
        this.refs.date.value = '';
        this.refs.amount.value = '';
    }

    render() {
        return (
            <div>
                <div className="card shadow expenditure-card">
                    <div className="card-header">
                        <h3>Add Expenditure</h3>
                    </div>
                    <div className="card-body">
                        <form id="form-oferta" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="selectCategory">Category</label>
                                <select className="form-control" id="selectCategory" name="category">
                                    {this.state.categories.sort().map(value => <option>{value}</option>)}

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description </label>
                                <textarea ref="description" type="text" name="description" className="form-control" id="inputDescription"
                                    placeholder="Dinner at steakhouse"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDate">Date </label>
                                <input ref="date" type="date" name="date" className="form-control" id="inputDate"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAmount">Amount </label>
                                <input ref="amount" type="number" name="amount" className="form-control" id="inputAmount"
                                    placeholder="1000"></input>
                            </div>
                            <hr></hr>
                            <div className="row justify-content-center">
                                <div className="col-6 text-center">
                                    <button type="button" className="btn btn-secondary" onClick={this.clickCancel} data-dismiss="modal">Cancel</button>
                                </div>
                                <div className="col-6 text-center">
                                    <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} />
            </div>
        );
    }
}

export default Expenditure;