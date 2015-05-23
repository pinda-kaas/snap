"use strict";

var app = angular.module('snapApp', []);

app.controller('MainCtrl', function ($scope,$timeout) {

    //get players cards
    var playerCards = [];
    var cpuCards = [];
    var cards_centre_pile=[];

    $scope.reactionTime=2000;

    $scope.startGame = function (playerToStart ) {
        var playerToStart = Math.random() >0.5 ? 1 :0;
        $scope.snap=false;
        cards_centre_pile=[];
        console.log('start game');

        var nrs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        var suits = ['c', 'h', 's', 'd'];

        nrs.forEach(function (nr) {
            suits.forEach(function (st) {
                if (st=='c' || st=='h')
                    playerCards.push({number: nr, suit: st})
                else
                    cpuCards.push({number: nr, suit: st})

            });
        });

        $scope.pickCard(playerToStart);

    }

    $scope.pickCard = function (p) {
        console.log('picks card:', p);
        var lastPickedCardOld = ($scope.lastPickedCard!=null) ?  $scope.lastPickedCard : 0;

        //debugger;
        if (p == 'player') {
            $scope.lastPickedCard = playerCards[0];

            //remove first card from player stack
            playerCards.splice(0, 1);

            cards_centre_pile.push(playerCards[0]);
        }

        if (p == 'cpu') {
            $scope.lastPickedCard = cpuCards[0];

            //remove first card from cpu stack
            cpuCards.splice(0, 1);

            cards_centre_pile.push(cpuCards[0]);
        }

        if (lastPickedCardOld.number == $scope.lastPickedCard.number) {
            //cpu calls snap with reacction time
            $timeout(function()
            {
                $scope.callSnap(1)
            }
                ,$scope.reactionTime);
            //console.log('cpu');
        }
    }

    $scope.callSnap=function(p){
        if (!$scope.snap) {
            $scope.snap = true;
            console.log('the winner is:', p);

            //winner takes the cards
            p==0 ?  playerCards.concat(cards_centre_pile) : cpuCards.concat(cards_centre_pile);

            console.log(cpuCards.length);
        }
    }



})

