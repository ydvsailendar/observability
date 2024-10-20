const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const { trace, context } = require("@opentelemetry/api");

const sdk = new opentelemetry.NodeSDK({
  serviceName: "mockapi",
  traceExporter: new OTLPTraceExporter({
    url: "http://jaeger:4318/v1/traces",
    headers: {},
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

const getCurrentTraceId = () => {
  const span = trace.getSpan(context.active());
  return span ? span.spanContext().traceId : null;
};
module.exports = { getCurrentTraceId };
