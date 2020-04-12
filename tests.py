import unittest
from dlgo.gotypes import *
from dlgo.goboard_slow import *


class TestGame(unittest.TestCase):

    def setUp(self):
        self.board = Board(19, 19)
        self.player = Player.black
        self.board = Board(19, 19)

    """ If a stone is placed, the board should return 
    that stone when queried """

    def test_place_stone(self):
        move = Point(5, 5)
        self.board.place_stone(self.player, move)
        new_stone = self.board.get(Point(5, 5))
        self.assertEqual(new_stone, Player.black)

    """ It should not be possible to place stones outside 
    the grid """

    def test_place_stone_outside_grid(self):
        move = Point(20, 20)
        with self.assertRaises(AssertionError):
            self.board.place_stone(self.player, move)


if __name__ == '__main__':
    unittest.main()
