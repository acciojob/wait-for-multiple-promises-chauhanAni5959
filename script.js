const output = document.getElementById('output');

// Create a Promise that resolves after a random delay between 1 and 3 seconds
function createRandomDelayPromise(promiseNumber) {
    const delaySeconds = (Math.random() * 2) + 1; // Random value between 1 and 3
    const delayMilliseconds = delaySeconds * 1000;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ promiseNumber, time: delaySeconds });
        }, delayMilliseconds);
    });
}

async function populatePromiseResults() {
    // Start with the 'Loading...' row already present
    // Create 3 promises
    const promises = [
        createRandomDelayPromise(1),
        createRandomDelayPromise(2),
        createRandomDelayPromise(3)
    ];

    // Wait for all promises to resolve and measure the total time
    const startTime = performance.now();
    const results = await Promise.all(promises);
    const totalElapsedTime = (performance.now() - startTime) / 1000;

    // Remove the 'Loading...' row (assumed to be the only row initially)
    output.innerHTML = '';

    // Add a row per promise result
    results.forEach(({ promiseNumber, time }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>Promise ${promiseNumber}</td>
            <td>${time.toFixed(3)}</td>
        `;
        output.appendChild(tr);
    });

    // Add the total row showing the total time (time the longest promise took)
    // According to spec, total is the longest among individual times, not totalElapsedTime
    const maxTime = results.reduce((max, curr) => (curr.time > max) ? curr.time : max, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td>Total</td>
        <td>${maxTime.toFixed(3)}</td>
    `;
    output.appendChild(totalRow);
}

// Run the function to populate the table when script loads
populatePromiseResults();
