function generateSubsets(n: number) {
  const result: number[][] = [];

  const dfs = (index: number, path: number[]) => {
    if (index === n) {
      if (path.length > 0) result.push([...path]); // ignore empty set
      return;
    }

    // Include current voter
    path.push(index);
    dfs(index + 1, path);
    path.pop();

    // Exclude current voter
    dfs(index + 1, path);
  };

  dfs(0, []);
  return result;
};

function factorial(n: number): number {
  return (n <= 1 ? 1 : n * factorial(n - 1));
}

function generatePermutations(arr: number[]) {
    const result: number[][] = [];
    const dfs = (index: number) => {
        if (index === arr.length) {
            result.push([...arr]);
            return;
        }

        for (let i = index; i < arr.length; i++) {
            [arr[index], arr[i]] = [arr[i], arr[index]];
            dfs(index + 1);
            [arr[index], arr[i]] = [arr[i], arr[index]];
        }
    };
    dfs(0);
    return result;
};

export function calcBanzhaf (quota: number, weights: number[]) {
  const n = weights.length;
  const criticalCount = Array(n).fill(0);

  const subsets = generateSubsets(n);

  for (const subset of subsets) {
    const sum = subset.reduce((acc, i) => acc + weights[i], 0);
    if (sum < quota) continue; // not a winning coalition
    console.log(subset, sum)
    for (const voter of subset) {
      const sumWithoutVoter = sum - weights[voter];
      if (sumWithoutVoter < quota) {
        criticalCount[voter]++;
      }
    }
  }

  const total = criticalCount.reduce((acc, val) => acc + val, 0);
  return total === 0
    ? Array(n).fill(0)
    : criticalCount.map(count => count / total);
};


export function calcShapley(quota: number, weights: number[]) {
    const n = weights.length;
    const permutations = generatePermutations([...Array(n).keys()]);
    const pivotalCount = Array(n).fill(0);

    for (const perm of permutations) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
            const voter = perm[i];
            sum += weights[voter];
            if (sum >= quota) {
                pivotalCount[voter]++;
                break;
            }
        }
    }

    const totalPermutations = factorial(n);
    return pivotalCount.map(count => count / totalPermutations);
};
