function WeatherSidePanel({ name }) {
  return (
    <div className="m-10 pb-2 pt-3 bg-green-900">
      <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-3xl dark:text-white text-center">
        {name}
      </h1>
    </div>
  );
}

export default WeatherSidePanel;
