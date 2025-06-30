import CardContainer from "../components/CardContainer";
import Footer from "../components/Footer";


export default function HomePage() {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">
        ⚽ Football Predictions
      </h1>
      <CardContainer />
    </div>
  );
}
