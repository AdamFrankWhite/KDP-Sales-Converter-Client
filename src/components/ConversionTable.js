import React from "react";
import marketplaces from "../data/Marketplaces";
export default function ConversionTable(props) {
    let paperbacks = props.paperbacks;
    let ebooks = props.ebooks;

    //Sort books by currency function
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
        // Loop through sorted books by currency
        for (const currency in booksByCurrency) {
            let bookObjectGroup = booksByCurrency[currency];
            let sales = [];
            bookObjectGroup.forEach((book) =>
                sales.push(parseFloat(book.Royalty))
            );
            let singleCurrencyTotalSales = sales.reduce(bookSalesReducer, 0);

            // Update book sales object with currency total
            marketplaces[currency][royaltyType] = singleCurrencyTotalSales;
        }
    };

    //Execute sort
    sortByCurrency(paperbacks, "paperbackRoyalty");
    sortByCurrency(ebooks, "ebookRoyalty");

    // Create table rows
    const rows = [];
    let combinedConvertedTotal = 0;
    // Loop through marketplaces object by market/currency
    for (const marketplace in marketplaces) {
        let singleMarketplace = marketplaces[marketplace];
        let singleMarketplaceTotal =
            singleMarketplace.ebookRoyalty + singleMarketplace.paperbackRoyalty;
        //Check if same currency as selected, to leave as is
        let convertedTotal = (
            props.rates[marketplace] == marketplace
                ? singleMarketplaceTotal / props.rates[marketplace]
                : singleMarketplaceTotal
        ).toFixed(2);
        // Add individual currency totals together
        combinedConvertedTotal += parseFloat(convertedTotal);
        // Check if any sales
        if (singleMarketplaceTotal > 0) {
            let row = (
                <tr>
                    <td>{singleMarketplace.name}</td>
                    <td>{singleMarketplace.ebookRoyalty.toFixed(2)}</td>
                    <td>{singleMarketplace.paperbackRoyalty.toFixed(2)}</td>
                    <td>{singleMarketplace.currency}</td>
                    <td>{singleMarketplaceTotal.toFixed(2)}</td>
                    <td className="gray-white">{convertedTotal}</td>
                </tr>
            );
            rows.push(row);
        }
    }

    // Final, total row
    let totalRow = (
        <tr>
            <td className="gray-white">Total</td>
            <td className="empty"></td>
            <td className="empty"></td>
            <td className="empty"></td>
            <td className="empty"></td>
            <td className="grandTotal">{combinedConvertedTotal.toFixed(2)}</td>
        </tr>
    );
    rows.push(totalRow);

    // Return table element
    return (
        <table id="conversion-table">
            <thead>
                <tr>
                    <td>Marketplace</td>
                    <td>Ebook Royalty</td>
                    <td>Paperback Royalty</td>
                    <td>Currency</td>
                    <td>Total</td>
                    <td className="gray-white">{props.chosenCurrency}</td>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
