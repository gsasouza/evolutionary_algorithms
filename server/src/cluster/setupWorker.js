import cluster from "cluster";
import handleWorker from "./handleWorker";

const setupWorker = () => {
  cluster.worker.on("message", msg => handleWorker(msg));
};

export default setupWorker;
