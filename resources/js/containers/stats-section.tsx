import { useEffect, useState } from "react";

const stats = [
  { value: "500+", label: "Salones activos" },
  { value: "15K", label: "Reservas procesadas" },
  { value: "98%", label: "Satisfacción del cliente" },
  { value: "24/7", label: "Soporte disponible" },
];

export default function StatsSection() {
  const [visible, setVisible] = useState(false);

  // Efecto para animar cuando entra al viewport
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // ejecutar al inicio
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="stats-section"
      className="py-16 relative overflow-hidden"
    >
      {/* Decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 dark:from-gray-950 via-transparent to-rose-100 dark:to-gray-950 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out transform ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } hover:scale-105`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-700 mt-2 text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
