/* eslint-disable @typescript-eslint/no-empty-interface */
export interface YahooApiGetFinancialsFinancialsTemplate {
    code: string;
    maxAge: number;
}

export interface YahooApiGetFinancialsInvestments {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToLiabilities {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashflowsFromInvestingActivities {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetBorrowings {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashFromFinancingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToOperatingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsIssuanceOfStock {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetIncome {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeInCash {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRepurchaseOfStock {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashFromOperatingActivities {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDepreciation {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCashflowsFromInvestingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDividendsPaid {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToInventory {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToAccountReceivables {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCashflowsFromFinancingActivities {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToNetincome {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCapitalExpenditures {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCashflowStatement {
    investments: YahooApiGetFinancialsInvestments;
    changeToLiabilities: YahooApiGetFinancialsChangeToLiabilities;
    totalCashflowsFromInvestingActivities: YahooApiGetFinancialsTotalCashflowsFromInvestingActivities;
    netBorrowings: YahooApiGetFinancialsNetBorrowings;
    totalCashFromFinancingActivities: YahooApiGetFinancialsTotalCashFromFinancingActivities;
    changeToOperatingActivities: YahooApiGetFinancialsChangeToOperatingActivities;
    issuanceOfStock: YahooApiGetFinancialsIssuanceOfStock;
    netIncome: YahooApiGetFinancialsNetIncome;
    changeInCash: YahooApiGetFinancialsChangeInCash;
    endDate: YahooApiGetFinancialsEndDate;
    repurchaseOfStock: YahooApiGetFinancialsRepurchaseOfStock;
    totalCashFromOperatingActivities: YahooApiGetFinancialsTotalCashFromOperatingActivities;
    depreciation: YahooApiGetFinancialsDepreciation;
    otherCashflowsFromInvestingActivities: YahooApiGetFinancialsOtherCashflowsFromInvestingActivities;
    dividendsPaid: YahooApiGetFinancialsDividendsPaid;
    changeToInventory: YahooApiGetFinancialsChangeToInventory;
    changeToAccountReceivables: YahooApiGetFinancialsChangeToAccountReceivables;
    otherCashflowsFromFinancingActivities: YahooApiGetFinancialsOtherCashflowsFromFinancingActivities;
    maxAge: number;
    changeToNetincome: YahooApiGetFinancialsChangeToNetincome;
    capitalExpenditures: YahooApiGetFinancialsCapitalExpenditures;
}

export interface YahooApiGetFinancialsCashflowStatementHistory {
    cashflowStatements: YahooApiGetFinancialsCashflowStatement[];
    maxAge: number;
}

export interface YahooApiGetFinancialsTotalLiab {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalStockholderEquity {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCurrentLiab {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalAssets {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate2 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsCommonStock {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCurrentAssets {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsRetainedEarnings {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherLiab {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTreasuryStock {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherAssets {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCash {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCurrentLiabilities {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsShortLongTermDebt {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherStockholderEquity {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsPropertyPlantEquipment {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCurrentAssets {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsLongTermInvestments {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetTangibleAssets {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsShortTermInvestments {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetReceivables {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsLongTermDebt {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsInventory {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsAccountsPayable {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsBalanceSheetStatement {
    totalLiab: YahooApiGetFinancialsTotalLiab;
    totalStockholderEquity: YahooApiGetFinancialsTotalStockholderEquity;
    otherCurrentLiab: YahooApiGetFinancialsOtherCurrentLiab;
    totalAssets: YahooApiGetFinancialsTotalAssets;
    endDate: YahooApiGetFinancialsEndDate2;
    commonStock: YahooApiGetFinancialsCommonStock;
    otherCurrentAssets: YahooApiGetFinancialsOtherCurrentAssets;
    retainedEarnings: YahooApiGetFinancialsRetainedEarnings;
    otherLiab: YahooApiGetFinancialsOtherLiab;
    treasuryStock: YahooApiGetFinancialsTreasuryStock;
    otherAssets: YahooApiGetFinancialsOtherAssets;
    cash: YahooApiGetFinancialsCash;
    totalCurrentLiabilities: YahooApiGetFinancialsTotalCurrentLiabilities;
    shortLongTermDebt: YahooApiGetFinancialsShortLongTermDebt;
    otherStockholderEquity: YahooApiGetFinancialsOtherStockholderEquity;
    propertyPlantEquipment: YahooApiGetFinancialsPropertyPlantEquipment;
    totalCurrentAssets: YahooApiGetFinancialsTotalCurrentAssets;
    longTermInvestments: YahooApiGetFinancialsLongTermInvestments;
    netTangibleAssets: YahooApiGetFinancialsNetTangibleAssets;
    shortTermInvestments: YahooApiGetFinancialsShortTermInvestments;
    netReceivables: YahooApiGetFinancialsNetReceivables;
    maxAge: number;
    longTermDebt: YahooApiGetFinancialsLongTermDebt;
    inventory: YahooApiGetFinancialsInventory;
    accountsPayable: YahooApiGetFinancialsAccountsPayable;
}

export interface YahooApiGetFinancialsBalanceSheetHistoryQuarterly {
    balanceSheetStatements: YahooApiGetFinancialsBalanceSheetStatement[];
    maxAge: number;
}

export interface YahooApiGetFinancialsActual {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsEstimate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsQuarterly {
    date: string;
    actual: YahooApiGetFinancialsActual;
    estimate: YahooApiGetFinancialsEstimate;
}

export interface YahooApiGetFinancialsCurrentQuarterEstimate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsEarningsDate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsEarningsChart {
    quarterly: YahooApiGetFinancialsQuarterly[];
    currentQuarterEstimate: YahooApiGetFinancialsCurrentQuarterEstimate;
    currentQuarterEstimateDate: string;
    currentQuarterEstimateYear: number;
    earningsDate: YahooApiGetFinancialsEarningsDate[];
}

export interface YahooApiGetFinancialsRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEarnings2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsYearly {
    date: number;
    revenue: YahooApiGetFinancialsRevenue;
    earnings: YahooApiGetFinancialsEarnings2;
}

export interface YahooApiGetFinancialsRevenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEarnings3 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsQuarterly2 {
    date: string;
    revenue: YahooApiGetFinancialsRevenue2;
    earnings: YahooApiGetFinancialsEarnings3;
}

export interface YahooApiGetFinancialsFinancialsChart {
    yearly: YahooApiGetFinancialsYearly[];
    quarterly: YahooApiGetFinancialsQuarterly2[];
}

export interface YahooApiGetFinancialsEarnings {
    maxAge: number;
    earningsChart: YahooApiGetFinancialsEarningsChart;
    financialsChart: YahooApiGetFinancialsFinancialsChart;
    financialCurrency: string;
}

export interface YahooApiGetFinancialsRegularMarketOpen {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAverageDailyVolume3Month {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsVolume24Hr {
}

export interface YahooApiGetFinancialsRegularMarketDayHigh {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAverageDailyVolume10Day {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsRegularMarketChange {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRegularMarketPreviousClose {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPreMarketPrice {
}

export interface YahooApiGetFinancialsPostMarketChange {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPostMarketPrice {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPreMarketChange {
}

export interface YahooApiGetFinancialsCirculatingSupply {
}

export interface YahooApiGetFinancialsRegularMarketDayLow {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPriceHint {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsRegularMarketPrice {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRegularMarketVolume {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOpenInterest {
}

export interface YahooApiGetFinancialsMarketCap {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsVolumeAllCurrencies {
}

export interface YahooApiGetFinancialsStrikePrice {
}

export interface YahooApiGetFinancialsPostMarketChangePercent {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRegularMarketChangePercent {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPrice {
    quoteSourceName: string;
    regularMarketOpen: YahooApiGetFinancialsRegularMarketOpen;
    averageDailyVolume3Month: YahooApiGetFinancialsAverageDailyVolume3Month;
    exchange: string;
    regularMarketTime: number;
    volume24Hr: YahooApiGetFinancialsVolume24Hr;
    regularMarketDayHigh: YahooApiGetFinancialsRegularMarketDayHigh;
    shortName: string;
    averageDailyVolume10Day: YahooApiGetFinancialsAverageDailyVolume10Day;
    longName: string;
    regularMarketChange: YahooApiGetFinancialsRegularMarketChange;
    currencySymbol: string;
    regularMarketPreviousClose: YahooApiGetFinancialsRegularMarketPreviousClose;
    postMarketTime: number;
    preMarketPrice: YahooApiGetFinancialsPreMarketPrice;
    exchangeDataDelayedBy: number;
    toCurrency?: any;
    postMarketChange: YahooApiGetFinancialsPostMarketChange;
    postMarketPrice: YahooApiGetFinancialsPostMarketPrice;
    exchangeName: string;
    preMarketChange: YahooApiGetFinancialsPreMarketChange;
    circulatingSupply: YahooApiGetFinancialsCirculatingSupply;
    regularMarketDayLow: YahooApiGetFinancialsRegularMarketDayLow;
    priceHint: YahooApiGetFinancialsPriceHint;
    currency: string;
    regularMarketPrice: YahooApiGetFinancialsRegularMarketPrice;
    regularMarketVolume: YahooApiGetFinancialsRegularMarketVolume;
    lastMarket?: any;
    regularMarketSource: string;
    openInterest: YahooApiGetFinancialsOpenInterest;
    marketState: string;
    underlyingSymbol?: any;
    marketCap: YahooApiGetFinancialsMarketCap;
    quoteType: string;
    volumeAllCurrencies: YahooApiGetFinancialsVolumeAllCurrencies;
    postMarketSource: string;
    strikePrice: YahooApiGetFinancialsStrikePrice;
    symbol: string;
    postMarketChangePercent: YahooApiGetFinancialsPostMarketChangePercent;
    preMarketSource: string;
    maxAge: number;
    fromCurrency?: any;
    regularMarketChangePercent: YahooApiGetFinancialsRegularMarketChangePercent;
}

export interface YahooApiGetFinancialsResearchDevelopment {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEffectOfAccountingCharges {
}

export interface YahooApiGetFinancialsIncomeBeforeTax {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsMinorityInterest {
}

export interface YahooApiGetFinancialsNetIncome2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsSellingGeneralAdministrative {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsGrossProfit {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEbit {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate3 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsOperatingIncome {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherOperatingExpenses {
}

export interface YahooApiGetFinancialsInterestExpense {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsExtraordinaryItems {
}

export interface YahooApiGetFinancialsNonRecurring {
}

export interface YahooApiGetFinancialsOtherItems {
}

export interface YahooApiGetFinancialsIncomeTaxExpense {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalOperatingExpenses {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCostOfRevenue {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalOtherIncomeExpenseNet {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDiscontinuedOperations {
}

export interface YahooApiGetFinancialsNetIncomeFromContinuingOps {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetIncomeApplicableToCommonShares {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsIncomeStatementHistory {
    researchDevelopment: YahooApiGetFinancialsResearchDevelopment;
    effectOfAccountingCharges: YahooApiGetFinancialsEffectOfAccountingCharges;
    incomeBeforeTax: YahooApiGetFinancialsIncomeBeforeTax;
    minorityInterest: YahooApiGetFinancialsMinorityInterest;
    netIncome: YahooApiGetFinancialsNetIncome2;
    sellingGeneralAdministrative: YahooApiGetFinancialsSellingGeneralAdministrative;
    grossProfit: YahooApiGetFinancialsGrossProfit;
    ebit: YahooApiGetFinancialsEbit;
    endDate: YahooApiGetFinancialsEndDate3;
    operatingIncome: YahooApiGetFinancialsOperatingIncome;
    otherOperatingExpenses: YahooApiGetFinancialsOtherOperatingExpenses;
    interestExpense: YahooApiGetFinancialsInterestExpense;
    extraordinaryItems: YahooApiGetFinancialsExtraordinaryItems;
    nonRecurring: YahooApiGetFinancialsNonRecurring;
    otherItems: YahooApiGetFinancialsOtherItems;
    incomeTaxExpense: YahooApiGetFinancialsIncomeTaxExpense;
    totalRevenue: YahooApiGetFinancialsTotalRevenue;
    totalOperatingExpenses: YahooApiGetFinancialsTotalOperatingExpenses;
    costOfRevenue: YahooApiGetFinancialsCostOfRevenue;
    totalOtherIncomeExpenseNet: YahooApiGetFinancialsTotalOtherIncomeExpenseNet;
    maxAge: number;
    discontinuedOperations: YahooApiGetFinancialsDiscontinuedOperations;
    netIncomeFromContinuingOps: YahooApiGetFinancialsNetIncomeFromContinuingOps;
    netIncomeApplicableToCommonShares: YahooApiGetFinancialsNetIncomeApplicableToCommonShares;
}

export interface YahooApiGetFinancialsIncomeStatementHistoryQuarterly {
    incomeStatementHistory: YahooApiGetFinancialsIncomeStatementHistory[];
    maxAge: number;
}

export interface YahooApiGetFinancialsResearchDevelopment2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEffectOfAccountingCharges2 {
}

export interface YahooApiGetFinancialsIncomeBeforeTax2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsMinorityInterest2 {
}

export interface YahooApiGetFinancialsNetIncome3 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsSellingGeneralAdministrative2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsGrossProfit2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEbit2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate4 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsOperatingIncome2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherOperatingExpenses2 {
}

export interface YahooApiGetFinancialsInterestExpense2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsExtraordinaryItems2 {
}

export interface YahooApiGetFinancialsNonRecurring2 {
}

export interface YahooApiGetFinancialsOtherItems2 {
}

export interface YahooApiGetFinancialsIncomeTaxExpense2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalRevenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalOperatingExpenses2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCostOfRevenue2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalOtherIncomeExpenseNet2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDiscontinuedOperations2 {
}

export interface YahooApiGetFinancialsNetIncomeFromContinuingOps2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetIncomeApplicableToCommonShares2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsIncomeStatementHistory3 {
    researchDevelopment: YahooApiGetFinancialsResearchDevelopment2;
    effectOfAccountingCharges: YahooApiGetFinancialsEffectOfAccountingCharges2;
    incomeBeforeTax: YahooApiGetFinancialsIncomeBeforeTax2;
    minorityInterest: YahooApiGetFinancialsMinorityInterest2;
    netIncome: YahooApiGetFinancialsNetIncome3;
    sellingGeneralAdministrative: YahooApiGetFinancialsSellingGeneralAdministrative2;
    grossProfit: YahooApiGetFinancialsGrossProfit2;
    ebit: YahooApiGetFinancialsEbit2;
    endDate: YahooApiGetFinancialsEndDate4;
    operatingIncome: YahooApiGetFinancialsOperatingIncome2;
    otherOperatingExpenses: YahooApiGetFinancialsOtherOperatingExpenses2;
    interestExpense: YahooApiGetFinancialsInterestExpense2;
    extraordinaryItems: YahooApiGetFinancialsExtraordinaryItems2;
    nonRecurring: YahooApiGetFinancialsNonRecurring2;
    otherItems: YahooApiGetFinancialsOtherItems2;
    incomeTaxExpense: YahooApiGetFinancialsIncomeTaxExpense2;
    totalRevenue: YahooApiGetFinancialsTotalRevenue2;
    totalOperatingExpenses: YahooApiGetFinancialsTotalOperatingExpenses2;
    costOfRevenue: YahooApiGetFinancialsCostOfRevenue2;
    totalOtherIncomeExpenseNet: YahooApiGetFinancialsTotalOtherIncomeExpenseNet2;
    maxAge: number;
    discontinuedOperations: YahooApiGetFinancialsDiscontinuedOperations2;
    netIncomeFromContinuingOps: YahooApiGetFinancialsNetIncomeFromContinuingOps2;
    netIncomeApplicableToCommonShares: YahooApiGetFinancialsNetIncomeApplicableToCommonShares2;
}

export interface YahooApiGetFinancialsIncomeStatementHistory2 {
    incomeStatementHistory: YahooApiGetFinancialsIncomeStatementHistory3[];
    maxAge: number;
}

export interface YahooApiGetFinancialsTotalLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalStockholderEquity2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCurrentLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate5 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsCommonStock2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCurrentAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsRetainedEarnings2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherLiab2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTreasuryStock2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCash2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCurrentLiabilities2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsShortLongTermDebt2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherStockholderEquity2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsPropertyPlantEquipment2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCurrentAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsLongTermInvestments2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetTangibleAssets2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsShortTermInvestments2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetReceivables2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsLongTermDebt2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsInventory2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsAccountsPayable2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsBalanceSheetStatement2 {
    totalLiab: YahooApiGetFinancialsTotalLiab2;
    totalStockholderEquity: YahooApiGetFinancialsTotalStockholderEquity2;
    otherCurrentLiab: YahooApiGetFinancialsOtherCurrentLiab2;
    totalAssets: YahooApiGetFinancialsTotalAssets2;
    endDate: YahooApiGetFinancialsEndDate5;
    commonStock: YahooApiGetFinancialsCommonStock2;
    otherCurrentAssets: YahooApiGetFinancialsOtherCurrentAssets2;
    retainedEarnings: YahooApiGetFinancialsRetainedEarnings2;
    otherLiab: YahooApiGetFinancialsOtherLiab2;
    treasuryStock: YahooApiGetFinancialsTreasuryStock2;
    otherAssets: YahooApiGetFinancialsOtherAssets2;
    cash: YahooApiGetFinancialsCash2;
    totalCurrentLiabilities: YahooApiGetFinancialsTotalCurrentLiabilities2;
    shortLongTermDebt: YahooApiGetFinancialsShortLongTermDebt2;
    otherStockholderEquity: YahooApiGetFinancialsOtherStockholderEquity2;
    propertyPlantEquipment: YahooApiGetFinancialsPropertyPlantEquipment2;
    totalCurrentAssets: YahooApiGetFinancialsTotalCurrentAssets2;
    longTermInvestments: YahooApiGetFinancialsLongTermInvestments2;
    netTangibleAssets: YahooApiGetFinancialsNetTangibleAssets2;
    shortTermInvestments: YahooApiGetFinancialsShortTermInvestments2;
    netReceivables: YahooApiGetFinancialsNetReceivables2;
    maxAge: number;
    longTermDebt: YahooApiGetFinancialsLongTermDebt2;
    inventory: YahooApiGetFinancialsInventory2;
    accountsPayable: YahooApiGetFinancialsAccountsPayable2;
}

export interface YahooApiGetFinancialsBalanceSheetHistory {
    balanceSheetStatements: YahooApiGetFinancialsBalanceSheetStatement2[];
    maxAge: number;
}

export interface YahooApiGetFinancialsInvestments2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToLiabilities2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashflowsFromInvestingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetBorrowings2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashFromFinancingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToOperatingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsIssuanceOfStock2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsNetIncome4 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeInCash2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsEndDate6 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRepurchaseOfStock2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalCashFromOperatingActivities2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDepreciation2 {
    raw: any;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCashflowsFromInvestingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDividendsPaid2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToInventory2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToAccountReceivables2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsOtherCashflowsFromFinancingActivities2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsChangeToNetincome2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCapitalExpenditures2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsCashflowStatement2 {
    investments: YahooApiGetFinancialsInvestments2;
    changeToLiabilities: YahooApiGetFinancialsChangeToLiabilities2;
    totalCashflowsFromInvestingActivities: YahooApiGetFinancialsTotalCashflowsFromInvestingActivities2;
    netBorrowings: YahooApiGetFinancialsNetBorrowings2;
    totalCashFromFinancingActivities: YahooApiGetFinancialsTotalCashFromFinancingActivities2;
    changeToOperatingActivities: YahooApiGetFinancialsChangeToOperatingActivities2;
    issuanceOfStock: YahooApiGetFinancialsIssuanceOfStock2;
    netIncome: YahooApiGetFinancialsNetIncome4;
    changeInCash: YahooApiGetFinancialsChangeInCash2;
    endDate: YahooApiGetFinancialsEndDate6;
    repurchaseOfStock: YahooApiGetFinancialsRepurchaseOfStock2;
    totalCashFromOperatingActivities: YahooApiGetFinancialsTotalCashFromOperatingActivities2;
    depreciation: YahooApiGetFinancialsDepreciation2;
    otherCashflowsFromInvestingActivities: YahooApiGetFinancialsOtherCashflowsFromInvestingActivities2;
    dividendsPaid: YahooApiGetFinancialsDividendsPaid2;
    changeToInventory: YahooApiGetFinancialsChangeToInventory2;
    changeToAccountReceivables: YahooApiGetFinancialsChangeToAccountReceivables2;
    otherCashflowsFromFinancingActivities: YahooApiGetFinancialsOtherCashflowsFromFinancingActivities2;
    maxAge: number;
    changeToNetincome: YahooApiGetFinancialsChangeToNetincome2;
    capitalExpenditures: YahooApiGetFinancialsCapitalExpenditures2;
}

export interface YahooApiGetFinancialsCashflowStatementHistoryQuarterly {
    cashflowStatements: YahooApiGetFinancialsCashflowStatement2[];
    maxAge: number;
}

export interface YahooApiGetFinancialsQuoteType {
    exchange: string;
    shortName: string;
    longName: string;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    isEsgPopulated: boolean;
    gmtOffSetMilliseconds: string;
    quoteType: string;
    symbol: string;
    messageBoardId: string;
    market: string;
}

export interface YahooApiGetFinancialsPreviousClose {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRegularMarketOpen2 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTwoHundredDayAverage {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingAnnualDividendYield {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPayoutRatio {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsVolume24Hr2 {
}

export interface YahooApiGetFinancialsRegularMarketDayHigh2 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsNavPrice {
}

export interface YahooApiGetFinancialsAverageDailyVolume10Day2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTotalAssets3 {
}

export interface YahooApiGetFinancialsRegularMarketPreviousClose2 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsFiftyDayAverage {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingAnnualDividendRate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsOpen {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAverageVolume10days {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsExpireDate {
}

export interface YahooApiGetFinancialsYield {
}

export interface YahooApiGetFinancialsDividendRate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsExDividendDate {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsBeta {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsCirculatingSupply2 {
}

export interface YahooApiGetFinancialsStartDate {
}

export interface YahooApiGetFinancialsRegularMarketDayLow2 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsPriceHint2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsTrailingPE {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsRegularMarketVolume2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsMaxSupply {
}

export interface YahooApiGetFinancialsOpenInterest2 {
}

export interface YahooApiGetFinancialsMarketCap2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsVolumeAllCurrencies2 {
}

export interface YahooApiGetFinancialsStrikePrice2 {
}

export interface YahooApiGetFinancialsAverageVolume {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsPriceToSalesTrailing12Months {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsDayLow {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAsk {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsYtdReturn {
}

export interface YahooApiGetFinancialsAskSize {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsVolume {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsFiftyTwoWeekHigh {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsForwardPE {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsFiveYearAvgDividendYield {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsFiftyTwoWeekLow {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsBid {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsDividendYield {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsBidSize {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface YahooApiGetFinancialsDayHigh {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsSummaryDetail {
    previousClose: YahooApiGetFinancialsPreviousClose;
    regularMarketOpen: YahooApiGetFinancialsRegularMarketOpen2;
    twoHundredDayAverage: YahooApiGetFinancialsTwoHundredDayAverage;
    trailingAnnualDividendYield: YahooApiGetFinancialsTrailingAnnualDividendYield;
    payoutRatio: YahooApiGetFinancialsPayoutRatio;
    volume24Hr: YahooApiGetFinancialsVolume24Hr2;
    regularMarketDayHigh: YahooApiGetFinancialsRegularMarketDayHigh2;
    navPrice: YahooApiGetFinancialsNavPrice;
    averageDailyVolume10Day: YahooApiGetFinancialsAverageDailyVolume10Day2;
    totalAssets: YahooApiGetFinancialsTotalAssets3;
    regularMarketPreviousClose: YahooApiGetFinancialsRegularMarketPreviousClose2;
    fiftyDayAverage: YahooApiGetFinancialsFiftyDayAverage;
    trailingAnnualDividendRate: YahooApiGetFinancialsTrailingAnnualDividendRate;
    open: YahooApiGetFinancialsOpen;
    toCurrency?: any;
    averageVolume10days: YahooApiGetFinancialsAverageVolume10days;
    expireDate: YahooApiGetFinancialsExpireDate;
    yield: YahooApiGetFinancialsYield;
    algorithm?: any;
    dividendRate: YahooApiGetFinancialsDividendRate;
    exDividendDate: YahooApiGetFinancialsExDividendDate;
    beta: YahooApiGetFinancialsBeta;
    circulatingSupply: YahooApiGetFinancialsCirculatingSupply2;
    startDate: YahooApiGetFinancialsStartDate;
    regularMarketDayLow: YahooApiGetFinancialsRegularMarketDayLow2;
    priceHint: YahooApiGetFinancialsPriceHint2;
    currency: string;
    trailingPE: YahooApiGetFinancialsTrailingPE;
    regularMarketVolume: YahooApiGetFinancialsRegularMarketVolume2;
    lastMarket?: any;
    maxSupply: YahooApiGetFinancialsMaxSupply;
    openInterest: YahooApiGetFinancialsOpenInterest2;
    marketCap: YahooApiGetFinancialsMarketCap2;
    volumeAllCurrencies: YahooApiGetFinancialsVolumeAllCurrencies2;
    strikePrice: YahooApiGetFinancialsStrikePrice2;
    averageVolume: YahooApiGetFinancialsAverageVolume;
    priceToSalesTrailing12Months: YahooApiGetFinancialsPriceToSalesTrailing12Months;
    dayLow: YahooApiGetFinancialsDayLow;
    ask: YahooApiGetFinancialsAsk;
    ytdReturn: YahooApiGetFinancialsYtdReturn;
    askSize: YahooApiGetFinancialsAskSize;
    volume: YahooApiGetFinancialsVolume;
    fiftyTwoWeekHigh: YahooApiGetFinancialsFiftyTwoWeekHigh;
    forwardPE: YahooApiGetFinancialsForwardPE;
    maxAge: number;
    fromCurrency?: any;
    fiveYearAvgDividendYield: YahooApiGetFinancialsFiveYearAvgDividendYield;
    fiftyTwoWeekLow: YahooApiGetFinancialsFiftyTwoWeekLow;
    bid: YahooApiGetFinancialsBid;
    tradeable: boolean;
    dividendYield: YahooApiGetFinancialsDividendYield;
    bidSize: YahooApiGetFinancialsBidSize;
    dayHigh: YahooApiGetFinancialsDayHigh;
}

export interface YahooApiGetFinancialsPageViews {
    shortTermTrend: string;
    midTermTrend: string;
    longTermTrend: string;
    maxAge: number;
}

export interface YahooApiGetFinancialsReportedValue {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualNetIncomeContinuousOperation {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue;
}

export interface YahooApiGetFinancialsReportedValue2 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualTotalRevenue {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue2;
}

export interface YahooApiGetFinancialsReportedValue3 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingNetIncomeCommonStockholder {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue3;
}

export interface YahooApiGetFinancialsReportedValue4 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingResearchAndDevelopment {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue4;
}

export interface YahooApiGetFinancialsReportedValue5 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualResearchAndDevelopment {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue5;
}

export interface YahooApiGetFinancialsReportedValue6 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualCostOfRevenue {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue6;
}

export interface YahooApiGetFinancialsReportedValue7 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingOperatingIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue7;
}

export interface YahooApiGetFinancialsReportedValue8 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingCostOfRevenue {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue8;
}

export interface YahooApiGetFinancialsReportedValue9 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingOtherIncomeExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue9;
}

export interface YahooApiGetFinancialsReportedValue10 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualBasicAverageShare {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue10;
}

export interface YahooApiGetFinancialsReportedValue11 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingTotalRevenue {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue11;
}

export interface YahooApiGetFinancialsReportedValue12 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualPretaxIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue12;
}

export interface YahooApiGetFinancialsReportedValue13 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualNetIncomeCommonStockholder {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue13;
}

export interface YahooApiGetFinancialsReportedValue14 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualInterestExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue14;
}

export interface YahooApiGetFinancialsReportedValue15 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualDilutedAverageShare {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue15;
}

export interface YahooApiGetFinancialsReportedValue16 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualTaxProvision {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue16;
}

export interface YahooApiGetFinancialsReportedValue17 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingInterestExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue17;
}

export interface YahooApiGetFinancialsReportedValue18 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingNetIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue18;
}

export interface YahooApiGetFinancialsReportedValue19 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingPretaxIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue19;
}

export interface YahooApiGetFinancialsReportedValue20 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualNetIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue20;
}

export interface YahooApiGetFinancialsReportedValue21 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualGrossProfit {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue21;
}

export interface YahooApiGetFinancialsReportedValue22 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualBasicEP {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue22;
}

export interface YahooApiGetFinancialsReportedValue23 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualSellingGeneralAndAdministration {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue23;
}

export interface YahooApiGetFinancialsReportedValue24 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingTaxProvision {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue24;
}

export interface YahooApiGetFinancialsReportedValue25 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualOtherIncomeExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue25;
}

export interface YahooApiGetFinancialsReportedValue26 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingGrossProfit {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue26;
}

export interface YahooApiGetFinancialsReportedValue27 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualOperatingIncome {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue27;
}

export interface YahooApiGetFinancialsReportedValue28 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingOperatingExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue28;
}

export interface YahooApiGetFinancialsReportedValue29 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualEbitda {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue29;
}

export interface YahooApiGetFinancialsReportedValue30 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingNetIncomeContinuousOperation {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue30;
}

export interface YahooApiGetFinancialsReportedValue31 {
    raw: any;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualOperatingExpense {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue31;
}

export interface YahooApiGetFinancialsReportedValue32 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsTrailingSellingGeneralAndAdministration {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue32;
}

export interface YahooApiGetFinancialsReportedValue33 {
    raw: number;
    fmt: string;
}

export interface YahooApiGetFinancialsAnnualDilutedEP {
    dataId: number;
    asOfDate: string;
    periodType: string;
    currencyCode: string;
    reportedValue: YahooApiGetFinancialsReportedValue33;
}

export interface YahooApiGetFinancialsTimeSeries {
    annualNetIncomeContinuousOperations: YahooApiGetFinancialsAnnualNetIncomeContinuousOperation[];
    annualTotalRevenue: YahooApiGetFinancialsAnnualTotalRevenue[];
    trailingNetIncomeCommonStockholders: YahooApiGetFinancialsTrailingNetIncomeCommonStockholder[];
    trailingResearchAndDevelopment: YahooApiGetFinancialsTrailingResearchAndDevelopment[];
    annualResearchAndDevelopment: YahooApiGetFinancialsAnnualResearchAndDevelopment[];
    annualCostOfRevenue: YahooApiGetFinancialsAnnualCostOfRevenue[];
    trailingOperatingIncome: YahooApiGetFinancialsTrailingOperatingIncome[];
    trailingCostOfRevenue: YahooApiGetFinancialsTrailingCostOfRevenue[];
    trailingOtherIncomeExpense: YahooApiGetFinancialsTrailingOtherIncomeExpense[];
    annualBasicAverageShares: YahooApiGetFinancialsAnnualBasicAverageShare[];
    trailingTotalRevenue: YahooApiGetFinancialsTrailingTotalRevenue[];
    annualPretaxIncome: YahooApiGetFinancialsAnnualPretaxIncome[];
    annualNetIncomeCommonStockholders: YahooApiGetFinancialsAnnualNetIncomeCommonStockholder[];
    annualInterestExpense: YahooApiGetFinancialsAnnualInterestExpense[];
    annualDilutedAverageShares: YahooApiGetFinancialsAnnualDilutedAverageShare[];
    annualTaxProvision: YahooApiGetFinancialsAnnualTaxProvision[];
    trailingInterestExpense: YahooApiGetFinancialsTrailingInterestExpense[];
    trailingNetIncome: YahooApiGetFinancialsTrailingNetIncome[];
    trailingPretaxIncome: YahooApiGetFinancialsTrailingPretaxIncome[];
    annualNetIncome: YahooApiGetFinancialsAnnualNetIncome[];
    annualGrossProfit: YahooApiGetFinancialsAnnualGrossProfit[];
    annualBasicEPS: YahooApiGetFinancialsAnnualBasicEP[];
    annualSellingGeneralAndAdministration: YahooApiGetFinancialsAnnualSellingGeneralAndAdministration[];
    trailingTaxProvision: YahooApiGetFinancialsTrailingTaxProvision[];
    annualOtherIncomeExpense: YahooApiGetFinancialsAnnualOtherIncomeExpense[];
    trailingGrossProfit: YahooApiGetFinancialsTrailingGrossProfit[];
    annualOperatingIncome: YahooApiGetFinancialsAnnualOperatingIncome[];
    trailingOperatingExpense: YahooApiGetFinancialsTrailingOperatingExpense[];
    annualEbitda: YahooApiGetFinancialsAnnualEbitda[];
    trailingNetIncomeContinuousOperations: YahooApiGetFinancialsTrailingNetIncomeContinuousOperation[];
    annualOperatingExpense: YahooApiGetFinancialsAnnualOperatingExpense[];
    trailingSellingGeneralAndAdministration: YahooApiGetFinancialsTrailingSellingGeneralAndAdministration[];
    annualDilutedEPS: YahooApiGetFinancialsAnnualDilutedEP[];
    trailingDilutedEPS: any[];
    trailingBasicEPS: any[];
    trailingBasicAverageShares: any[];
    trailingDilutedAverageShares: any[];
    timestamp: number[];
}

export interface YahooApiGetFinancialsMeta {
    symbol: string;
    start: number;
    end: number;
    timeUnit: string;
}

export interface YahooApiGetFinancialsResult {
    financialsTemplate: YahooApiGetFinancialsFinancialsTemplate;
    cashflowStatementHistory: YahooApiGetFinancialsCashflowStatementHistory;
    balanceSheetHistoryQuarterly: YahooApiGetFinancialsBalanceSheetHistoryQuarterly;
    earnings: YahooApiGetFinancialsEarnings;
    price: YahooApiGetFinancialsPrice;
    incomeStatementHistoryQuarterly: YahooApiGetFinancialsIncomeStatementHistoryQuarterly;
    incomeStatementHistory: YahooApiGetFinancialsIncomeStatementHistory2;
    balanceSheetHistory: YahooApiGetFinancialsBalanceSheetHistory;
    cashflowStatementHistoryQuarterly: YahooApiGetFinancialsCashflowStatementHistoryQuarterly;
    quoteType: YahooApiGetFinancialsQuoteType;
    summaryDetail: YahooApiGetFinancialsSummaryDetail;
    symbol: string;
    pageViews: YahooApiGetFinancialsPageViews;
    timeSeries: YahooApiGetFinancialsTimeSeries;
    meta: YahooApiGetFinancialsMeta;
    loading: boolean;
    errorList: any[];
}


