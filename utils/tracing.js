// const opentelemetry = require("@opentelemetry/sdk-node");
// const {
//   getNodeAutoInstrumentations,
// } = require("@opentelemetry/auto-instrumentations-node");
// const {
//   OTLPTraceExporter,
// } = require("@opentelemetry/exporter-trace-otlp-proto");
// const {
//   OTLPMetricExporter,
// } = require("@opentelemetry/exporter-metrics-otlp-proto");
// const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
// const { trace, context } = require("@opentelemetry/api");

// const otlpEndpoint = "http://35.179.107.142:4318";
// const sdk = new opentelemetry.NodeSDK({
//   serviceName: "mockapi",
//   traceExporter: new OTLPTraceExporter({
//     url: `${otlpEndpoint}/v1/traces`,
//     headers: {},
//   }),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new OTLPMetricExporter({
//       url: `${otlpEndpoint}/v1/metrics`,
//       headers: {},
//       concurrencyLimit: 1,
//     }),
//     exportIntervalMillis: 10000,
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
// });
// sdk.start();

// const getCurrentTraceId = () => {
//   const span = trace.getSpan(context.active());
//   return span ? span.spanContext().traceId : null;
// };
// module.exports = { getCurrentTraceId };

/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require("@opentelemetry/sdk-metrics");

const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

const getCurrentTraceId = () => {
  const span = trace.getSpan(context.active());
  return span ? span.spanContext().traceId : null;
};
module.exports = { getCurrentTraceId };
