fetch("data/fulton-county.json")
  .then(r => r.json())
  .then(data => {
    renderMetrics(data.metrics);
    renderTimeline(data.timeline);
    renderAttackChart(data.attackVectors);
  });

function renderMetrics(metrics) {
  const box = document.getElementById("metrics");
  box.innerHTML = Object.entries(metrics)
    .map(([k, v]) => `<div class="metric"><strong>${k}:</strong> ${v}</div>`)
    .join("");
}

function renderTimeline(events) {
  const box = document.getElementById("timeline");
  box.innerHTML = `<ul class="timeline">
    ${events.map(item => `<li><strong>${item.phase}:</strong> ${item.description} 
[${item.impact}]</li>`).join("")}
  </ul>`;
}

function renderAttackChart(vectors) {
  new Chart(document.getElementById("attackChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(vectors),
      datasets: [{
        data: Object.values(vectors),
        backgroundColor: ["#00d9ff", "#0088cc", "#004477", "#00ffaa"]
      }]
    }
  });
}

