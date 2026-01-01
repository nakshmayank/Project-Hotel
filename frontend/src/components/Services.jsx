function Services() {
  return (
    <section id="services" className="relative py-20 bg-gray-200/20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Services We Offer
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

        <div className="bg-gray-100/60 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Digital Check-In</h3>
          <p className="text-gray-600">
            Fast and paperless visitor check-in using digital forms.
          </p>
        </div>

        <div className="bg-gray-100/60 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Digital Check-Out</h3>
          <p className="text-gray-600">
            Simple and accurate check-out with automatic time recording.
          </p>
        </div>

        <div className="bg-gray-100/60 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Visitor Records</h3>
          <p className="text-gray-600">
            Secure storage and quick access to visitor history.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Services;
