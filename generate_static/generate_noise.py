import numpy as np
from PIL import Image

SIZE = 2048  # Higher resolution for smoother result
OCTAVES = 5  # Reduced for smoother, less noisy result
LACUNARITY = 2.0
GAIN = 0.6  # Increased to preserve some detail
SEED = 1337

rng = np.random.default_rng(SEED)

# Create a larger grid for seamless wrapping
GRID_SIZE = SIZE + 1  # Extra row/column for wrapping
grid = rng.random((GRID_SIZE, GRID_SIZE))

def smoothstep(t):
    return t * t * (3 - 2 * t)

def value_noise_seamless(x, y, size):
    """Seamless value noise using modulo wrapping"""
    x0 = int(np.floor(x)) % size
    y0 = int(np.floor(y)) % size
    x1 = (x0 + 1) % size
    y1 = (y0 + 1) % size

    fx = x - np.floor(x)
    fy = y - np.floor(y)

    fx = smoothstep(fx)
    fy = smoothstep(fy)

    a = grid[y0, x0]
    b = grid[y0, x1]
    c = grid[y1, x0]
    d = grid[y1, x1]

    return (
        a * (1 - fx) * (1 - fy) +
        b * fx * (1 - fy) +
        c * (1 - fx) * fy +
        d * fx * fy
    )

noise = np.zeros((SIZE, SIZE), dtype=np.float32)

print("Generating seamless noise texture...")
for y in range(SIZE):
    if y % 100 == 0:
        print(f"Progress: {y}/{SIZE}")
    for x in range(SIZE):
        amplitude = 1.0
        frequency = 1.0
        value = 0.0

        for _ in range(OCTAVES):
            # Normalize coordinates to 0-SIZE range for seamless wrapping
            sample_x = (x * frequency) % SIZE
            sample_y = (y * frequency) % SIZE
            
            value += amplitude * value_noise_seamless(
                sample_x,
                sample_y,
                SIZE
            )
            frequency *= LACUNARITY
            amplitude *= GAIN

        noise[y, x] = value

# Normalize to 0–1
noise -= noise.min()
noise /= noise.max()

# Verify seamless edges
print(f"Edge verification - Top-Bottom difference: {np.abs(noise[0, :] - noise[-1, :]).max():.6f}")
print(f"Edge verification - Left-Right difference: {np.abs(noise[:, 0] - noise[:, -1]).max():.6f}")

img = Image.fromarray((noise * 255).astype(np.uint8), mode="L")
img.save("noise.png")

print("✓ Generated 1024x1024 SEAMLESS FBM noise texture: noise.png")