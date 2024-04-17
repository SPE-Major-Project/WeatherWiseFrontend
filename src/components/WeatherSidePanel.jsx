function WeatherSidePanel({ name }) {
  return (
    <div className="m-10 pb-5 bg-green-900">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {name}
      </h1>
    </div>
  );
}

export default WeatherSidePanel;
