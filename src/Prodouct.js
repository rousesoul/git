import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import AuthService from "./services/auth.service";

export default function Prodouct() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const [columns] = useState([
    { title: 'Product Image', field: 'imageUrl', render: (rowData) => <img src={rowData.imageUrl} alt='' width='120' height='80' /> },
    { title: '品名 (Product Name)', field: 'productName', initialEditValue: 'Cherry' },
    { title: 'Product Code', field: 'productCode', type: 'numeric' },
    { title: 'RRP Price (CNY)', field: 'priceRrp', type: 'numeric' },
    { title: 'Shopify Price (CNY)', field: 'priceShopify', type: 'numeric' },
    { title: 'Agent Price (CNY)', field: 'priceAgent', type: 'numeric' },
    { title: '1212 Price (CNY)', field: 'price1212', type: 'numeric' },
    { title: 'Special Price (CNY)', field: 'priceSpecial', type: 'numeric' },
    { title: 'Desciption', field: 'desciption', type: 'numeric' },
    { title: 'Weight (KG)', field: 'weight', type: 'numeric' },
    { title: 'Package Qty', field: 'packageQty', type: 'numeric' },
    { title: 'Product Id', field: 'productId', type: 'numeric' },
  ]);

  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://206.189.39.185:5031/api/Product')
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      {currentUser ?
        <MaterialTable
          title="Product"
          columns={columns}
          data={data}
          options={{ actionsColumnIndex: -1, addRowPosition: 'first' }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);

                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve()
                }, 1000)
              }),
          }} />
        :
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </>
  )
}