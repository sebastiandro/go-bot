import asyncio
import websockets
import random

CLIENTS = set()


async def handler(websocket, path):
    if path == "/sub":
        CLIENTS.add(websocket)
        try:
            async for msg in websocket:
                pass
        except websockets.ConnectionClosedError:
            pass
        finally:
            CLIENTS.remove(websocket)
    elif path == "/pub":
        board = await websocket.recv()
        print(board)
        for ws in CLIENTS:
            await ws.send(board)


start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
