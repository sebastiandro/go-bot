from dlgo.agent import naive
from dlgo import goboard_slow
from dlgo import gotypes
from dlgo.utils import print_board, print_move, board_to_json, move_to_text
import time
import random
import json
import asyncio
import websockets

uri = "ws://localhost:8765/pub"


async def main():
    board_size = 9
    game = goboard_slow.GameState.new_game(board_size)
    bots = {
        gotypes.Player.black: naive.RandomBot(),
        gotypes.Player.white: naive.RandomBot(),
    }
    while not game.is_over():
        print(chr(27) + "[2j")
        bot_move = bots[game.next_player].select_move(game)
        print_move(game.next_player, bot_move)
        game = game.apply_move(bot_move)
        print_board(game.board)

        board_json = {
            "board": {
                "rows": board_to_json(game.board)
            },
            "message": move_to_text(game.next_player, bot_move)
        }

        async with websockets.connect(uri) as websocket:
            await websocket.send(json.dumps(board_json))

        time.sleep(0.5)


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
