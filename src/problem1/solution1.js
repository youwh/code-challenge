function sum_to_n_a(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

function sum_to_n_b(n) {
  let sum = 0;
  let i = 1;

  while (i <= n) {
    sum += i;
    i++;
  }

  return sum;
}

function sum_to_n_c(n) {
  return (n * (n + 1)) / 2;
}
