import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import ToastMessage from "../../common/ToastMessage";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OrdersList = ({ orders, cancelOrder }) => {
  const classes = useStyles();

  if (orders.error !== null) {
    return <ToastMessage msg={orders.error.msg} />;
  }

  if (orders.orders.length === 0) {
    return (
      <div style={{ marginBottom: "170px" }}>
        <h3 style={{ marginTop: "70px", textAlign: "center" }}>
          You haven't ordered anything yet. All your orders will appear here
          once you place them.
        </h3>
      </div>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order number</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Placed on</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.orders.map(
              (order) =>
                order.orderStatus === "In progress" && (
                  <TableRow key={order._id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          console.log(order._id);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {order.placedOn.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={order.orderStatus} color="primary" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          cancelOrder(order._id);
                        }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
            {orders.orders.map(
              (order, index) =>
                order.orderStatus === "Completed" && (
                  <TableRow key={index}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          console.log(order._id);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {order.placedOn.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={order.orderStatus}
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary" disabled>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
            {orders.orders.map(
              (order, index) =>
                order.orderStatus === "Cancelled" && (
                  <TableRow key={index}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          console.log(order._id);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {order.placedOn.toString().slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={order.orderStatus} variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary" disabled>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

OrdersList.propTypes = {
  orders: PropTypes.object.isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

export default OrdersList;
