import { useState, useEffect } from "react";
// import Button from "../../components/Button";
import { getFinancial, getReturns } from "../../api/sellerApi";
import { useNavigate } from "react-router-dom";
import './seller.css';

const months = [
  { value: "01", name: "January" },
  { value: "02", name: "February" },
  { value: "03", name: "March" },
  { value: "04", name: "April" },
  { value: "05", name: "May" },
  { value: "06", name: "June" },
  { value: "07", name: "July" },
  { value: "08", name: "August" },
  { value: "09", name: "September" },
  { value: "10", name: "October" },
  { value: "11", name: "November" },
  { value: "12", name: "December" },
];

function SellerFinancialPage() {
  const [sales, setSales] = useState(null);
  const [returns, setReturns] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getFinancial()
      .then((data) => { setSales(data);
        // start on the most recent month that has sales
        if (data.length > 0) {
          setYear(data[0].dateCreated.slice(0, 4));
          setMonth(data[0].dateCreated.slice(5, 7));
      }
      })
      .catch((err) => alert(err.message));


    getReturns()
      .then((data) => setReturns(data))
      .catch((err) => alert(err.message));

  }, []);

  if (!sales || !returns) {
    return <h3>Retrieving Sales Data...</h3>;
  }

  const years = [...new Set(sales.map((item) => item.dateCreated.slice(0, 4)))];

  const selectedMonth = `${year}-${month}`; // "2026-10"

  const monthSales = sales.filter((item) =>
    item.dateCreated.startsWith(selectedMonth)
  );

  const monthReturns = returns.filter(
    (item) =>
      item.returnStatus === "refunded" &&
      item.dateRequested.startsWith(selectedMonth)
  );

   let totalSales = 0;
  for (const item of monthSales) {
    totalSales += item.price * item.itemQuantity;
  }

  let totalLosses = 0;
  for (const item of monthReturns) {
    totalLosses += item.price * item.returnQuantity;
  }

  return (
    <div className="listings-container">
      <h2>Financial History</h2>

      <div class="listings-buttons-container">
        {/* <button
            type="button"
            className="seller-view-listings-button"
            onClick={() => navigate("/seller/")}
          >
            My Account
        </button> */}
        <button
          type="button"
          className="seller-view-listings-button"
          onClick={() => navigate("/seller")}
        >
          My Account
        </button>

      </div>

      <div className="seller-orders-buttons-container">
        <select className="seller-view-orders-button" value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select className="seller-view-orders-button" value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="net-sales">
          <div>Net Revenue for the Month</div>
          <div>${((totalSales / 100).toFixed(2)-(totalLosses / 100).toFixed(2))}</div>
        </div>
      </div>

      <h3>Sales</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Item ID</th>
            <th>Listing</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {monthSales.map((item) => (
            <tr key={item.orderItemID}>
              <td>{item.orderID}</td>
              <td>{item.orderItemID}</td>
              <td>{item.listingTitle}</td>
              <td>{item.itemQuantity}</td>
              <td>${((item.price * item.itemQuantity) / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-sales">
            <td colSpan="4">Total Sales</td>
            <td>+${(totalSales / 100).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <h3>Losses</h3>
      <table>
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Order ID</th>
            <th>Order Item ID</th>
            <th>Listing</th>
            <th>Quantity</th>
            <th>Loss</th>
          </tr>
        </thead>
        <tbody>
          {monthReturns.map((item) => (
            <tr key={item.returnID}>
              <td>{item.returnID}</td>
              <td>{item.orderID}</td>
              <td>{item.orderItemID}</td>
              <td>{item.listingTitle}</td>
              <td>{item.returnQuantity}</td>
              <td>${((item.price * item.returnQuantity) / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-losses">
            <td colSpan="5">Total Losses</td>
            <td>-${(totalLosses / 100).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      

    </div>
  );
}

export default SellerFinancialPage;
