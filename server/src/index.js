import cluster from "cluster";
import setupMaster from "./cluster/setupMaster";
import setupWorker from "./cluster/setupWorker";

if (cluster.isMaster) {
  setupMaster();
}
else setupWorker();

cluster.on("exit", worker => {
  console.log("mayday! mayday! worker", worker.id, " is no more!");
  cluster.fork();
});

cluster.on("online", function(worker) {
  console.log("Worker " + worker.process.pid + " is listening");
});
