import CardContainer from "../components/CardContainer";

export default function HomePage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">⚽ Football Predictions</h1>

      {/* Match cards (with filters) */}
      <CardContainer />
    </div>
  );
}
