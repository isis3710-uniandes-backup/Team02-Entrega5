import React, { Component } from 'react';

class Expenditure extends Component {

    state = {
        categories: [
            "Food",
            "Shopping",
            "Services",
            "Laundry",
            "Phone",
            "House",
            "Car",
            "Technology",
            "Water",
            "Energy",
            "Gas",
            "Clothing",
            "Education",
            "Health care",
            "Savings",
            "Transportation",
            "Insurance",
            "Entertainment and recreation",
            "Gasoline and motor fuels",
            "Travel",
            "Labor costs"
        ]
    }

    handleSubmit(event) {

    }

    render() {
        return (
            <div>
                <div className="card shadow">
                    <div className="card-header">
                        <h3>Add Expenditure</h3>
                    </div>
                    <div className="card-body">
                        <form id="form-oferta" onSubmit={this.handleSubmit.bind(this)}>
                            <div class="form-group">
                                <label for="selectCategory">Category</label>
                                <select class="form-control" id="selectCategory">
                                    {this.state.categories.map(value => <option>{value}</option>)}   
                                
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCategory">Category </label>
                                <input type="text" name="category" className="form-control" id="inputCategory" placeholder="Food"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description </label>
                                <textarea type="text" name="description" className="form-control" id="inputDescription"
                                    placeholder="Dinner at steakhouse"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDate">Date </label>
                                <input type="date" name="date" className="form-control" id="inputDate"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAmount">Amount </label>
                                <input type="number" name="amount" className="form-control" id="inputAmount"
                                    placeholder="1000"></input>
                            </div>
                            <hr></hr>
                            <div className="row justify-content-center">
                                <div className="col-6 text-center">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                                <div className="col-6 text-center">
                                    <button type="submit" value="Submit" className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Expenditure;