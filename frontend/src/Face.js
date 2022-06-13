import React, { useCallback } from 'react';
import Customer from './Customer.js';
import CustomerForm from './CustomerForm.js'
import Provider from './Provider.js';
import Route from './Route'
import ProviderForm from './ProviderForm.js'
import TableRoute from './TableRoute.js'
import Paper from '@mui/material/Paper';

const paperStyle={padding:'50px 20px', width:'95%',margin:"20px auto", "background-color":"#222222"}

class Face extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: [new Customer("O1"), new Customer("O2"), new Customer("O3")],
            providers: [new Provider("P1"), new Provider("P2")],
            routes: [[], []],
            responseRoutes: [],
            clicked: false,
            profit: 0,
            selling: 0,
            costs: 0,
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                this.state.routes[i][j] = new Route(i, j, 0, 0)
            }
        }

        this.setCustomer = this.setCustomer.bind(this)
        this.setProvider = this.setProvider.bind(this)
        this.submit = this.submit.bind(this)
    }

    setCustomer(customer) {
        var prev = { ...this.state }
        prev.customers.push(customer)
        this.setState(prev)
    }

    setProvider(provider) {
        var prev = { ...this.state }
        prev.providers.push(provider)
        this.setState(prev)
    }

    submit(state) {
        this.state.clicked = true
        console.log(state)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: state.customers, providers: state.providers, routes: state.routes })
        }

        console.log(JSON.stringify({ customers: state.customers, providers: state.providers, routes: state.routes }))

        let placeholder = this
        console.log("placeholder", placeholder)

        const request = fetch('http://localhost:8080/broker/calc', requestOptions)
            .then(response => response.json())
            .then(data => {
                let previous = { ...state }
                previous.responseRoutes = data.routes
                previous.costs = data.costs
                previous.selling = data.selling
                previous.profit = data.profit
                placeholder.setState(previous)
            })
    }

    render() {
        if(this.state.responseRoutes.length==0)
        return (
            <div>
                <TableRoute submit={this.submit} customers={this.state.customers} providers={this.state.providers} routes={this.state.routes} />
                {/* <table>
                    <tr>
                        <th>Odbiorca 1</th>
                        <th>Odbiorca 2</th>
                        <th>Odbiorca 3</th>
                        <th>Fikcyjny odbiorca</th>
                    </tr>
                    <tr>
                        <td>s</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                    </table> */}
            </div>
        )
        else{
            console.log("state routes: ",this.state.responseRoutes)
        return (
            <div>
                <TableRoute submit={this.submit} customers={this.state.customers} providers={this.state.providers} routes={this.state.routes} />
                <h1> ROZWIĄZANIE </h1>
                
                <br />
                ZYSK CAŁKOWITY: {this.state.profit}
                <br />
                KOSZTY CAŁKOWITE: {this.state.costs}
                <br />
                PRZYCHÓD CAŁKOWITY: {this.state.selling}
                <br />
                <br />

                <Paper style={paperStyle}>
                <table>
                    <tr>
                        <th>DOSTAWCY/ODBIORCY</th>
                        <th>{this.state.customers[0].name}</th>
                        <th>{this.state.customers[1].name}</th>
                        <th>{this.state.customers[2].name}</th>
                        <th>Fikcyjny odbiorca</th>
                    </tr>
                    <tr>
                        <th>{this.state.providers[0].name}</th>
                        <td>Obsadzenie: {this.state.responseRoutes[0][0]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[0][0]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[0][1]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[0][1]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[0][2]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[0][2]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[0][3]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[0][3]["profit"]}</td>
                    </tr>
                    <tr>
                        <th>{this.state.providers[1].name}</th>
                        <td>Obsadzenie: {this.state.responseRoutes[1][0]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[1][0]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[1][1]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[1][1]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[1][2]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[1][2]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[1][3]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[1][3]["profit"]}</td>
                    </tr>
                    <tr>
                        <th>Fikcyjny dostawca</th>
                        <td>Obsadzenie: {this.state.responseRoutes[2][0]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[2][0]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[2][1]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[2][1]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[2][2]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[2][2]["profit"]}</td>
                        <td>Obsadzenie: {this.state.responseRoutes[2][3]["amountOfGoods"]}<br/><br/>Zysk: {this.state.responseRoutes[2][3]["profit"]}</td>
                    </tr>
                    </table>
                    </Paper>
            </div>
        )
        }
        /*return (
            <div>
                <CustomerForm onCustomersChange={this.setCustomer}></CustomerForm>
                <ProviderForm onProvidersChange={this.setProvider}></ProviderForm>

                <TableRoute submit={this.submit} customers={this.state.customers} providers={this.state.providers} routes={this.state.routes} />
            </div>
        )*/
    }
}

export default Face;