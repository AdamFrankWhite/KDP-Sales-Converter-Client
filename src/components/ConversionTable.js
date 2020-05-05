import React from "react";

export default function ConversionTable(props) {
  let paperbacks = props.paperbacks;
  let ebooks = props.ebooks;

  let marketplaces = {
    CAD: {
      name: "Amazon.ca",
      currency: "CAD",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    USD: {
      name: "Amazon.com",
      currency: "USD",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    GBP: {
      name: "Amazon.co.uk",
      currency: "GBP",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    EUR: {
      name: "Amazon.EU",
      currency: "EUR",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    JPY: {
      name: "Amazon.co.jp",
      currency: "JPY",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    INR: {
      name: "Amazon.in",
      currency: "INR",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    BRL: {
      name: "Amazon.com.br",
      currency: "BRL",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    MXN: {
      name: "Amazon.com.mx",
      currency: "MXN",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },

    AUD: {
      name: "Amazon.com.au",
      currency: "AUD",
      ebookRoyalty: 0,
      paperbackRoyalty: 0,
    },
  };

  //Sort by currency
  const sortByCurrency = (books, royaltyType) => {
    let booksByCurrency = {
      CAD: [],
      USD: [],
      GBP: [],
      EUR: [],
      JPY: [],
      INR: [],
      BRL: [],
      MXN: [],
      AUD: [],
    };
    books.forEach((book) => {
      booksByCurrency[`${book.Currency}`].push(book);
    });
    const bookSalesReducer = (accumulator, currentValue) =>
      accumulator + currentValue;
    for (const currency in booksByCurrency) {
      let bookObjectGroup = booksByCurrency[currency];
      let sales = [];
      bookObjectGroup.forEach((book) => sales.push(parseFloat(book.Royalty)));
      let singleCurrencyTotalSales = sales.reduce(bookSalesReducer, 0);
      if (royaltyType === "paperbackRoyalty") {
        marketplaces[currency].ebookRoyalty = singleCurrencyTotalSales;
      } else if (royaltyType === "ebookRoyalty") {
        marketplaces[currency].paperbackRoyalty = singleCurrencyTotalSales;
      }
    }
  };

  sortByCurrency(paperbacks, "paperbackRoyalty");
  sortByCurrency(ebooks, "ebookRoyalty");

  // Create table rows
  const rows = [];

  for (const currency in marketplaces) {
    let singleCurrencyCombinedSales = marketplaces[currency];
    let singleCurrencyTotal =
      singleCurrencyCombinedSales.ebookRoyalty +
      singleCurrencyCombinedSales.paperbackRoyalty;
    let row = (
      <tr>
        <td>{singleCurrencyCombinedSales.name}</td>
        <td>{singleCurrencyCombinedSales.currency}</td>
        <td>{singleCurrencyCombinedSales.ebookRoyalty.toFixed(2)}</td>
        <td>{singleCurrencyCombinedSales.paperbackRoyalty.toFixed(2)}</td>
        <td>{singleCurrencyTotal.toFixed(2)}</td>
        <td>{(singleCurrencyTotal / props.rates[currency]).toFixed(2)}</td>
      </tr>
    );
    rows.push(row);
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Marketplace</td>
            <td>Currency</td>
            <td>Ebook Royalty</td>
            <td>Paperback Royalty</td>
            <td>Total</td>
            <td>{props.chosenCurrency}</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
