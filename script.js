const output = document.getElementById('output');

// Create a promise resolving after random 1-3 seconds
function createRandomDelayPromise(promiseNumber) {
    const delaySeconds = (Math.random() * 2) + 1;
    const delayMilliseconds = delaySeconds * 1000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ promiseNumber, time: delaySeconds });
        }, delayMilliseconds);
    });
}

async function trackPromises() {
    const promises = [
        createRandomDelayPromise(1),
        createRandomDelayPromise(2),
        createRandomDelayPromise(3)
    ];

    const startTime = performance.now();

    const results = await Promise.all(promises);

    const elapsedTime = (performance.now() - startTime) / 1000;

    // Remove loading row
    const loadingRow = document.getElementById('loading');
    if (loadingRow) loadingRow.remove();

    // Add rows with promise results
    results.forEach(result => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Promise ${result.promiseNumber}</td>
          <td>${result.time.toFixed(3)}</td>
        `;
        output.appendChild(tr);
    });

    // Add total time row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${elapsedTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
}

// Start promises on load
trackPromises();
