export default function Features() {
  return (
      <section id="features" className="py-12">
          <div className="container mx-auto px-6">
              <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Why Choose Our Platform?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Feature Item */}
                  <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <h3 className="font-bold text-xl mb-2">Complete Inventory Tracking</h3>
                      <p className="text-gray-600">Keep track of all your IT assets in one place, reducing losses and maximising utilisation.</p>
                  </div>
                  {/* Feature Item */}
                  <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <h3 className="font-bold text-xl mb-2">Collaborative Environment</h3>
                      <p className="text-gray-600">Work together with your team to manage and update assets seamlessly.</p>
                  </div>
                  {/* Feature Item */}
                  <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <h3 className="font-bold text-xl mb-2">Advanced Reporting</h3>
                      <p className="text-gray-600">Generate reports to get insights into your assets' status and history.</p>
                  </div>
                  {/* Repeat for other features */}
              </div>
          </div>
      </section>
  );
}
