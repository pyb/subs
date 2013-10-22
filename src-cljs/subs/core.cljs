(ns subs.core
  (:require [subs.draw :as draw]
            [goog.dom :as dom]
            [goog.Timer :as Timer]
            [goog.events :as events]))

(declare add-tile)

(def pos (atom [5 5]))

(def draw-fns
 {:hard-wall (partial draw/draw-wall "blue")
  :soft-wall (partial draw/draw-wall "black")
  :explosion (partial draw/draw-wall "red")})

(def walls
  (list {:x 4 :y 6 :direction :up :length 3 :type :hard-wall}
        {:x 1 :y 1 :direction :right :length 6 :type :soft-wall}))

(defn decompose-wall [wall]
  (if (= 0 (:length wall))
      '()
      (let [x (:x wall)
            y (:y wall)
            [x2 y2] (case (:direction wall)
                      :up [x (+ y 1)]
                      :right [(+ x 1) y])]
        (cons {:x (:x wall) :y (:y wall) :type (:type wall) :wall wall}
              (decompose-wall {:x x2 :y y2
                               :type (:type wall)
                               :direction (:direction wall)
                               :length (- (:length wall) 1)})))))


(defn add-walls [tiles walls]
  (if (empty? walls)
      tiles
      (add-walls (concat (decompose-wall (first walls))
                          tiles)
                 (rest walls))))

(defn add-tile [tile board]
  (let [x (:x tile)
        y (:y tile)
        row (board x)
        new-row (assoc row y tile)]
    (assoc board x new-row)))


(defn make-board
  ([tiles w h]
   (make-board tiles (vec (repeat w (vec (repeat h {}))))))
  ([tiles board]
   (if (empty? tiles)
        board
     (make-board (rest tiles)
                 (add-tile (first tiles)
                           board)))))

(defn render [tiles]
  (doseq [tile tiles]
    ((draw-fns (tile :type)) (tile :x) (tile :y))))

;; frame-count unused
(defn game-loop [frame-count]
  (let [tiles (add-walls '() walls)]
    (draw/clear-canvas)
    (render tiles)
    (apply draw/draw-hero @pos)
    ;; (draw-rect (+ 10 frame-count) 10)
    ;; (when (> 1 frame-count) (js/lololo))

;; Look at key status and reset move timer ...
    (.requestAnimationFrame js/window #(game-loop (inc frame-count)))))

(declare pressed-key)
(defn move-hero []
  (swap! pos #(let [[x y] %
                    [dx dy] (case @pressed-key
                              nil [0 0]
                              :up    [ 0   -0.5]
                              :right [ 0.5   0]
                              :left  [-0.5   0]
                              :down  [ 0    0.5])]
                [(+ x dx)
                 (+ y dy)])))

(defn main []
  (let [canvas  (.getElementById js/document "canvas")
        context (.getContext canvas "2d")]
    (.log js/console "canvas is" canvas)
    (.log js/console "context is" context)
    (draw/init context canvas))
  
  (let [timer (goog.Timer. 100)]
    (do (. timer (start))
        (events/listen timer goog.Timer/TICK move-hero)))

  (game-loop 0))

(def pressed-key (atom nil))

(def keycodes {37 :left 38 :up 39 :right 40 :down})

(.addEventListener js/window "keydown"
                   (fn [event]
                     (reset! pressed-key (keycodes (.-keyCode event)))))

(.addEventListener js/window "keyup"
                   (fn [event]
                     (reset! pressed-key nil)))
