const hello = obj => obj?.info?.name || throw new Error('Falsey!');