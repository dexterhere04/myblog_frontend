import numpy as np
from PIL import Image

SIZE = 2048
SEED = 1337

# Flow tuning - adjusted for smoother flow
VERTICAL_STRENGTH = 1.0
HORIZONTAL_VARIANCE = 0.2  # Reduced for smoother horizontal motion
NOISE_SCALE = 3.0  # Reduced for larger, smoother features

rng = np.random.default_rng(SEED)

# Create a larger grid for seamless wrapping
GRID_SIZE = SIZE + 1
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

flow = np.zeros((SIZE, SIZE, 2), dtype=np.float32)

print("Generating seamless flow map...")
for y in range(SIZE):
    if y % 100 == 0:
        print(f"Progress: {y}/{SIZE}")
    for x in range(SIZE):
        # Normalize coordinates for seamless tiling
        nx = (x / SIZE * NOISE_SCALE * SIZE) % SIZE
        ny = (y / SIZE * NOISE_SCALE * SIZE) % SIZE

        # Horizontal wobble (low frequency)
        wobble = value_noise_seamless(nx, ny, SIZE) * 2.0 - 1.0
        fx = wobble * HORIZONTAL_VARIANCE

        # Strong upward motion
        fy = -VERTICAL_STRENGTH

        flow[y, x, 0] = fx
        flow[y, x, 1] = fy

# Normalize vectors
length = np.linalg.norm(flow, axis=2, keepdims=True)
flow /= np.maximum(length, 1e-5)

# Apply slight smoothing to reduce noise
from scipy.ndimage import gaussian_filter
flow[:, :, 0] = gaussian_filter(flow[:, :, 0], sigma=1.0)
flow[:, :, 1] = gaussian_filter(flow[:, :, 1], sigma=1.0)

# Re-normalize after smoothing
length = np.linalg.norm(flow, axis=2, keepdims=True)
flow /= np.maximum(length, 1e-5)

# Verify seamless edges
edge_diff_tb = np.abs(flow[0, :, :] - flow[-1, :, :]).max()
edge_diff_lr = np.abs(flow[:, 0, :] - flow[:, -1, :]).max()
print(f"Edge verification - Top-Bottom difference: {edge_diff_tb:.6f}")
print(f"Edge verification - Left-Right difference: {edge_diff_lr:.6f}")

# Encode to 0–255
encoded = (flow * 0.5 + 0.5).clip(0, 1)

# Expand to RGBA
rgba = np.zeros((SIZE, SIZE, 4), dtype=np.uint8)
rgba[..., 0] = (encoded[..., 0] * 255).astype(np.uint8)  # R = X flow
rgba[..., 1] = (encoded[..., 1] * 255).astype(np.uint8)  # G = Y flow
rgba[..., 2] = 128                                       # B = neutral
rgba[..., 3] = 255                                       # A = opaque

img = Image.fromarray(rgba, "RGBA")
img.save("flow.png")

print("✓ Generated 2048x2048 SEAMLESS smooth waterfall flow map: flow.png")