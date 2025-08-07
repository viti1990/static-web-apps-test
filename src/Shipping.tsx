import { useState } from 'react';
type Point = {
    name: string;
    lat: number;
    lon: number;
}
type PackageHistory = {
  trackingNumber: string;
  status: string;
  date: string;
};
type Props = {
    availablePoints: Point[];
};

const PackageTracker = ({ availablePoints } : Props) => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [packageStatus, setPackageStatus] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [history, setHistory] = useState<PackageHistory[]>([]);

  // Lógica para simular el seguimiento de un paquete
  const checkPackageStatus = (trackingNumber: string) : void => {
    const statuses = ['In Transit', 'Delivered', 'Out for Delivery', 'Pending', 'Failed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date().toLocaleDateString();

    // Añadir al historial
    const newPackage = { trackingNumber, status, date };
    setHistory(prev => [...prev, newPackage]);
    setPackageStatus(status);
  };

  // Lógica para encontrar puntos cercanos según la ubicación
  
const findNearbyPoints = () => {
 
  // Simulamos la búsqueda de puntos cercanos
  const nearbyPoints = availablePoints.filter((point) =>
    point.name.toLowerCase().includes(location.toLowerCase())
  );

  return nearbyPoints;  // Regresa el arreglo de puntos cercanos
};

  // Manejo de cambios en el input de seguimiento
  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
  };

  // Manejo de la búsqueda de puntos de entrega
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setLocation(e.target.value);
  };

  return (
    <div className="package-tracker">
      <h2>Seguimiento de Paquete</h2>

      {/* Campo de seguimiento */}
      <input
        type="text"
        placeholder="Número de Seguimiento"
        value={trackingNumber}
        onChange={handleTrackingChange}
      />
      <button onClick={() => checkPackageStatus(trackingNumber)}>
        Ver Estado eeee
      </button>

      {/* Mostrar estado del paquete */}
      {packageStatus && (
        <div>
          <h3>Estado: {packageStatus}</h3>
        </div>
      )}

      {/* Historial de paquetes */}
      <div>
        <h3>Historial de Seguimiento:</h3>
        <ul>
          {history.map((pkg) => (
            <li key={pkg.trackingNumber}>
              {pkg.trackingNumber} - {pkg.status} - {pkg.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Campo de ubicación para buscar puntos de entrega */}
      <input
        type="text"
        placeholder="Buscar puntos cercanos"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={findNearbyPoints}>Buscar Puntos</button>

      {/* Puntos de entrega cercanos */}
      <div>
        <h3>Puntos Cercanos:</h3>
        <ul>
          {findNearbyPoints().map((point) => (
            <li key={point.name}>{point.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageTracker;
