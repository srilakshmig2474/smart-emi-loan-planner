/* =====================================================
   VARIABLES
===================================================== */

let schedule = [];

let currency = "INR";


const currencyInfo = {

    INR: {
        symbol: "₹",
        code: "INR",
        locale: "en-IN"
    },

    USD: {
        symbol: "$",
        code: "USD",
        locale: "en-US"
    },

    EUR: {
        symbol: "€",
        code: "EUR",
        locale: "de-DE"
    },

    GBP: {
        symbol: "£",
        code: "GBP",
        locale: "en-GB"
    }

};


/* =====================================================
   MONEY FORMAT
===================================================== */

function money(value) {

    const info =
        currencyInfo[currency];


    return new Intl.NumberFormat(

        info.locale,

        {

            style: "currency",

            currency: info.code,

            maximumFractionDigits: 0

        }

    ).format(value || 0);

}


/* =====================================================
   EMI FORMULA
===================================================== */

function calculateEMI(
    principal,
    annualRate,
    months
) {

    if (
        principal <= 0 ||
        months <= 0
    ) {

        return 0;

    }


    const monthlyRate =
        annualRate /
        12 /
        100;


    if (
        monthlyRate === 0
    ) {

        return principal / months;

    }


    const factor =
        Math.pow(
            1 + monthlyRate,
            months
        );


    return (

        principal *
        monthlyRate *
        factor /
        (factor - 1)

    );

}


/* =====================================================
   MAIN CALCULATION
===================================================== */

function calculate() {

    const amount =
        Number(
            document.getElementById(
                "loanAmount"
            ).value
        );


    const rate =
        Number(
            document.getElementById(
                "interestRate"
            ).value
        );


    const tenure =
        Number(
            document.getElementById(
                "tenure"
            ).value
        );


    const unit =
        document.getElementById(
            "tenureUnit"
        ).value;


    const months =
        unit === "years"
            ? tenure * 12
            : tenure;


    const error =
        document.getElementById(
            "error"
        );


    if (
        amount < 1000 ||
        rate < 0 ||
        months < 1
    ) {

        error.textContent =
            "Please enter valid loan details.";

        return;

    }


    error.textContent = "";


    const emi =
        calculateEMI(
            amount,
            rate,
            months
        );


    /* =================================================
       AMORTIZATION
    ================================================= */

    schedule = [];


    let balance =
        amount;


    const monthlyRate =
        rate /
        12 /
        100;


    for (
        let month = 1;
        month <= months;
        month++
    ) {

        const interest =
            balance *
            monthlyRate;


        let principal =
            emi -
            interest;


        let payment =
            emi;


        if (
            month === months ||
            principal > balance
        ) {

            principal =
                balance;


            payment =
                principal +
                interest;

        }


        balance =
            Math.max(
                0,
                balance -
                principal
            );


        schedule.push({

            month,

            emi: payment,

            principal,

            interest,

            balance

        });

    }


    const total =
        schedule.reduce(

            (sum, row) =>
                sum + row.emi,

            0

        );


    const totalInterest =
        total -
        amount;


    /* =================================================
       DISPLAY RESULTS
    ================================================= */

    document.getElementById(
        "emi"
    ).textContent =
        money(emi);


    document.getElementById(
        "interest"
    ).textContent =
        money(totalInterest);


    document.getElementById(
        "total"
    ).textContent =
        money(total);


    document.getElementById(
        "totalTenure"
    ).textContent =
        months + " months";


    /* =================================================
       INSIGHT
    ================================================= */

    document.getElementById(
        "insightText"
    ).textContent =

        `For a ${money(amount)} loan, your monthly EMI is ${money(emi)}. Over ${months} months, you will pay ${money(totalInterest)} as interest and ${money(total)} in total.`;


    /* =================================================
       CHART
    ================================================= */

    drawPieChart(
        amount,
        totalInterest
    );


    /* =================================================
       TABLE
    ================================================= */

    renderTable();

}


/* =====================================================
   DOUGHNUT CHART
===================================================== */

function drawPieChart(
    principal,
    interest
) {

    const canvas =
        document.getElementById(
            "pieChart"
        );


    const ctx =
        canvas.getContext("2d");


    const width =
        canvas.width;


    const height =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const total =
        principal +
        interest;


    if (total <= 0) {

        return;

    }


    const centerX =
        width / 2;


    const centerY =
        height / 2;


    const radius =
        90;


    const principalAngle =
        (
            principal /
            total
        ) *
        Math.PI *
        2;


    /* PRINCIPAL */

    ctx.beginPath();


    ctx.moveTo(
        centerX,
        centerY
    );


    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        principalAngle
    );


    ctx.closePath();


    ctx.fillStyle =
        "#8b5cf6";


    ctx.fill();


    /* INTEREST */

    ctx.beginPath();


    ctx.moveTo(
        centerX,
        centerY
    );


    ctx.arc(
        centerX,
        centerY,
        radius,
        principalAngle,
        Math.PI * 2
    );


    ctx.closePath();


    ctx.fillStyle =
        "#10b981";


    ctx.fill();


    /* CENTER */

    ctx.beginPath();


    ctx.arc(
        centerX,
        centerY,
        50,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).getPropertyValue(
            "--card"
        );


    ctx.fill();


    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).getPropertyValue(
            "--text"
        );


    ctx.textAlign =
        "center";


    ctx.font =
        "bold 14px Arial";


    ctx.fillText(
        "Payment",
        centerX,
        centerY + 5
    );


    /* LEGEND */

    ctx.textAlign =
        "left";


    ctx.font =
        "12px Arial";


    ctx.fillStyle =
        "#8b5cf6";


    ctx.fillRect(
        45,
        height - 35,
        12,
        12
    );


    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).getPropertyValue(
            "--text"
        );


    ctx.fillText(
        "Loan Amount",
        63,
        height - 25
    );


    ctx.fillStyle =
        "#10b981";


    ctx.fillRect(
        180,
        height - 35,
        12,
        12
    );


    ctx.fillStyle =
        getComputedStyle(
            document.body
        ).getPropertyValue(
            "--text"
        );


    ctx.fillText(
        "Interest",
        198,
        height - 25
    );

}


/* =====================================================
   AMORTIZATION TABLE
===================================================== */

function renderTable() {

    const body =
        document.getElementById(
            "tableBody"
        );


    const search =
        document.getElementById(
            "search"
        ).value
        .toLowerCase();


    const rows =
        schedule.filter(

            row =>
                String(
                    row.month
                ).includes(search)

        );


    body.innerHTML =

        rows.map(

            row => `

            <tr>

                <td>
                    ${row.month}
                </td>

                <td>
                    ${money(row.emi)}
                </td>

                <td>
                    ${money(row.principal)}
                </td>

                <td>
                    ${money(row.interest)}
                </td>

                <td>
                    ${money(row.balance)}
                </td>

            </tr>

            `

        ).join("");

}


/* =====================================================
   CURRENCY
===================================================== */

function changeCurrency() {

    currency =
        document.getElementById(
            "currency"
        ).value;


    document.getElementById(
        "currencySymbol"
    ).textContent =
        currencyInfo[
            currency
        ].symbol;


    calculate();

}


/* =====================================================
   RESET
===================================================== */

function resetCalculator() {

    document.getElementById(
        "loanType"
    ).value =
        "Personal Loan";


    document.getElementById(
        "currency"
    ).value =
        "INR";


    currency =
        "INR";


    document.getElementById(
        "currencySymbol"
    ).textContent =
        "₹";


    document.getElementById(
        "loanAmount"
    ).value =
        500000;


    document.getElementById(
        "interestRate"
    ).value =
        8.5;


    document.getElementById(
        "tenure"
    ).value =
        5;


    document.getElementById(
        "tenureUnit"
    ).value =
        "years";


    calculate();

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

    document.body
        .classList
        .toggle("dark");


    const dark =
        document.body
            .classList
            .contains("dark");


    document.getElementById(
        "themeButton"
    ).textContent =
        dark
            ? "☀️"
            : "🌙";


    if (schedule.length) {

        const amount =
            Number(
                document.getElementById(
                    "loanAmount"
                ).value
            );


        const interest =
            schedule.reduce(

                (sum, row) =>
                    sum + row.interest,

                0

            );


        drawPieChart(
            amount,
            interest
        );

    }

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(
    page,
    button
) {

    document
        .querySelectorAll(".page")
        .forEach(

            section => {

                section.classList
                    .remove("active");

            }

        );


    document
        .querySelectorAll(".nav-button")
        .forEach(

            btn => {

                btn.classList
                    .remove("active");

            }

        );


    document
        .getElementById(page)
        .classList
        .add("active");


    button.classList
        .add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   SAVE LOAN
===================================================== */

function saveLoan() {

    if (!schedule.length) {

        alert(
            "Please calculate EMI first."
        );

        return;

    }


    const loan = {

        id:
            Date.now(),

        type:
            document.getElementById(
                "loanType"
            ).value,

        currency,

        amount:
            Number(
                document.getElementById(
                    "loanAmount"
                ).value
            ),

        rate:
            Number(
                document.getElementById(
                    "interestRate"
                ).value
            ),

        tenure:
            Number(
                document.getElementById(
                    "tenure"
                ).value
            ),

        unit:
            document.getElementById(
                "tenureUnit"
            ).value,

        emi:
            schedule[0].emi

    };


    const loans =
        JSON.parse(

            localStorage.getItem(
                "smartEMILoans"
            )

            || "[]"

        );


    loans.push(loan);


    localStorage.setItem(

        "smartEMILoans",

        JSON.stringify(
            loans
        )

    );


    renderSaved();


    alert(
        "Calculation saved successfully!"
    );

}


/* =====================================================
   RENDER SAVED
===================================================== */

function renderSaved() {

    const container =
        document.getElementById(
            "savedLoans"
        );


    const loans =
        JSON.parse(

            localStorage.getItem(
                "smartEMILoans"
            )

            || "[]"

        );


    if (!loans.length) {

        container.innerHTML = `

        <div class="saved-card">

            <h3>
                No Saved Loans
            </h3>

            <p>
                Save a calculation to
                see it here.
            </p>

        </div>

        `;

        return;

    }


    container.innerHTML =

        loans.map(

            loan => `

            <div class="saved-card">

                <h3>
                    ${loan.type}
                </h3>


                <p>

                    ${loan.currency}
                    ·
                    ${money(loan.amount)}
                    ·
                    ${loan.rate}%

                </p>


                <div class="saved-emi">

                    ${money(loan.emi)}

                    <small>
                        / month
                    </small>

                </div>


                <button
                    class="secondary"
                    onclick="deleteLoan(${loan.id})">

                    Delete

                </button>

            </div>

            `

        ).join("");

}


/* =====================================================
   DELETE SAVED
===================================================== */

function deleteLoan(id) {

    let loans =
        JSON.parse(

            localStorage.getItem(
                "smartEMILoans"
            )

            || "[]"

        );


    loans =
        loans.filter(

            loan =>
                loan.id !== id

        );


    localStorage.setItem(

        "smartEMILoans",

        JSON.stringify(
            loans
        )

    );


    renderSaved();

}


/* =====================================================
   CLEAR SAVED
===================================================== */

function clearSaved() {

    localStorage.removeItem(
        "smartEMILoans"
    );


    renderSaved();

}


/* =====================================================
   COMPARE LOANS
===================================================== */

function compareLoans() {

    const aAmount =
        Number(
            document.getElementById(
                "aAmount"
            ).value
        );


    const aRate =
        Number(
            document.getElementById(
                "aRate"
            ).value
        );


    const aYears =
        Number(
            document.getElementById(
                "aYears"
            ).value
        );


    const bAmount =
        Number(
            document.getElementById(
                "bAmount"
            ).value
        );


    const bRate =
        Number(
            document.getElementById(
                "bRate"
            ).value
        );


    const bYears =
        Number(
            document.getElementById(
                "bYears"
            ).value
        );


    const aMonths =
        aYears * 12;


    const bMonths =
        bYears * 12;


    const aEMI =
        calculateEMI(
            aAmount,
            aRate,
            aMonths
        );


    const bEMI =
        calculateEMI(
            bAmount,
            bRate,
            bMonths
        );


    const aTotal =
        aEMI *
        aMonths;


    const bTotal =
        bEMI *
        bMonths;


    document.getElementById(
        "aEMI"
    ).textContent =
        money(aEMI);


    document.getElementById(
        "bEMI"
    ).textContent =
        money(bEMI);


    document.getElementById(
        "aInterest"
    ).textContent =

        money(
            aTotal -
            aAmount
        )
        +
        " interest";


    document.getElementById(
        "bInterest"
    ).textContent =

        money(
            bTotal -
            bAmount
        )
        +
        " interest";


    const difference =
        Math.abs(
            aTotal -
            bTotal
        );


    if (
        aTotal <
        bTotal
    ) {

        document.getElementById(
            "winner"
        ).textContent =

            `Loan A is cheaper by ${money(difference)}.`;

    }

    else if (
        bTotal <
        aTotal
    ) {

        document.getElementById(
            "winner"
        ).textContent =

            `Loan B is cheaper by ${money(difference)}.`;

    }

    else {

        document.getElementById(
            "winner"
        ).textContent =

            "Both loans have the same estimated repayment.";

    }

}


/* =====================================================
   EXPORT CSV
===================================================== */

function exportCSV() {

    if (!schedule.length) {

        alert(
            "Please calculate EMI first."
        );

        return;

    }


    let csv =
        "Month,EMI,Principal,Interest,Balance\n";


    schedule.forEach(

        row => {

            csv +=

                `${row.month},${row.emi.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;

        }

    );


    const blob =
        new Blob(

            [csv],

            {
                type:
                    "text/csv"
            }

        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "emi-amortization.csv";


    link.click();


    URL.revokeObjectURL(
        url
    );

}


/* =====================================================
   DOWNLOAD REPORT
===================================================== */

function downloadReport() {

    if (!schedule.length) {

        alert(
            "Please calculate EMI first."
        );

        return;

    }


    const amount =
        Number(
            document.getElementById(
                "loanAmount"
            ).value
        );


    const rate =
        Number(
            document.getElementById(
                "interestRate"
            ).value
        );


    const tenure =
        Number(
            document.getElementById(
                "tenure"
            ).value
        );


    const unit =
        document.getElementById(
            "tenureUnit"
        ).value;


    const emi =
        schedule[0].emi;


    const total =
        schedule.reduce(

            (sum, row) =>
                sum + row.emi,

            0

        );


    const interest =
        total -
        amount;


    const report = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
Smart EMI Loan Report
</title>

<style>

body {

    font-family: Arial;

    padding: 40px;

    color: #29243a;

}

h1 {

    color: #8b5cf6;

}

.box {

    border:
        1px solid #e7e2ee;

    padding: 18px;

    margin: 12px 0;

    border-radius: 10px;

}

.value {

    font-size: 23px;

    font-weight: bold;

    margin-top: 5px;

}

table {

    width: 100%;

    border-collapse:
        collapse;

}

th,
td {

    border:
        1px solid #ddd;

    padding: 8px;

    text-align: right;

}

th {

    background:
        #f3efff;

}

</style>

</head>


<body>


<h1>
Smart EMI & Loan Planner
</h1>


<p>
Loan Calculation Report
</p>


<div class="box">

<strong>
Loan Type
</strong>

<div class="value">

${document.getElementById(
    "loanType"
).value}

</div>

</div>


<div class="box">

<strong>
Loan Amount
</strong>

<div class="value">

${money(amount)}

</div>

</div>


<div class="box">

<strong>
Interest Rate
</strong>

<div class="value">

${rate}%

</div>

</div>


<div class="box">

<strong>
Tenure
</strong>

<div class="value">

${tenure} ${unit}

</div>

</div>


<div class="box">

<strong>
Monthly EMI
</strong>

<div class="value">

${money(emi)}

</div>

</div>


<div class="box">

<strong>
Total Interest
</strong>

<div class="value">

${money(interest)}

</div>

</div>


<div class="box">

<strong>
Total Payment
</strong>

<div class="value">

${money(total)}

</div>

</div>


<h2>
Amortization Schedule
</h2>


<table>


<tr>

<th>
Month
</th>

<th>
EMI
</th>

<th>
Principal
</th>

<th>
Interest
</th>

<th>
Balance
</th>

</tr>


${schedule.map(

row => `

<tr>

<td>
${row.month}
</td>

<td>
${money(row.emi)}
</td>

<td>
${money(row.principal)}
</td>

<td>
${money(row.interest)}
</td>

<td>
${money(row.balance)}
</td>

</tr>

`

).join("")}


</table>


</body>

</html>

`;


    const blob =
        new Blob(

            [report],

            {
                type:
                    "text/html"
            }

        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "Smart-EMI-Loan-Report.html";


    link.click();


    URL.revokeObjectURL(
        url
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

calculate();

renderSaved();
