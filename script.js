const output = document.getElementById('output');

// Create a Promise resolving after random 1–3 seconds, returning resolution time
function createRandomDelayPromise(promiseNumber) {
    const delaySeconds = (Math.random() * 2) + 1;
    const delayMilliseconds = delaySeconds * 1000;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ promiseNumber, time: delaySeconds });
        }, delayMilliseconds);
    });
}

async function populatePromiseResults() {
    // Initially, ensure loading row with id="loading" exists
    if (!document.getElementById('loading')) {
        const loadingRow = document.createElement('tr');
        loadingRow.id = 'loading';
        loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
        output.appendChild(loadingRow);
    }

    const promises = [
        createRandomDelayPromise(1),
        createRandomDelayPromise(2),
        createRandomDelayPromise(3)
    ];

    const results = await Promise.all(promises);

    // Remove the loading row now that promises resolved
    const loadingRow = document.getElementById('loading');
    if (loadingRow) loadingRow.remove();

    // Add rows for each promise
    results.forEach(({ promiseNumber, time }) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>Promise ${promiseNumber}</td><td>${time.toFixed(3)}</td>`;
        output.appendChild(tr);
    });

    // Add total row showing max time among promises
    const maxTime = results.reduce((max, r) => r.time > max ? r.time : max, 0);
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${maxTime.toFixed(3)}</td>`;
    output.appendChild(totalRow);
}

// Run
populatePromiseResults();
