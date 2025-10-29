const output = document.getElementById('output');

// Function to create a promise that resolves after a random 1 to 3 seconds delay
function createRandomDelayPromise(promiseNumber) {
    const delaySeconds = (Math.random() * 2) + 1; // Random between 1 and 3
    const delayMilliseconds = delaySeconds * 1000;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ promiseNumber, time: delaySeconds });
        }, delayMilliseconds);
    });
}

async function trackPromises() {
    // Create three promises
    const promises = [
        createRandomDelayPromise(1),
        createRandomDelayPromise(2),
        createRandomDelayPromise(3)
    ];

    // Record start time
    const startTime = performance.now();

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Calculate total elapsed time
    const elapsedTime = (performance.now() - startTime) / 1000;

    // Clear initial loading row
    output.innerHTML = '';

    // Add result rows for each promise
    for (const result of results) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Promise ${result.promiseNumber}</td>
          <td>${result.time.toFixed(3)}</td>
        `;
        output.appendChild(tr);
    }

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${elapsedTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
}

// Run the tracking function on page load
trackPromises();
