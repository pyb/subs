(ns subs.draw)

(def canvas (atom nil))
(def context (atom nil)) ; unused

;; (defn draw-rect [x y]
;;   (.beginPath context)
;;   (set! (.-fillStyle context) "#888")
;;   (.fillRect context x y 50 50))


(defn init [con can]
  (reset! canvas can)
  (reset! context con)  
  (set! (.-width @canvas) 1000)
  (set! (.-height @canvas) 600))

(defn clear-canvas []
  (set! (.-width @canvas) (.-width @canvas)))

(defn draw-wall [color x y]
  (.beginPath @context)
  (set! (.-fillStyle @context) color)
  (.moveTo @context (* x 10) (* y 10))
  (.lineTo @context (+ (* x 10) 10) (* y 10))
  (.lineTo @context (+ (* x 10) 10) (+ (* y 10) 10))
  (.lineTo @context (* x 10) (+ (* y 10) 10))
  (.closePath @context)
  (.fill @context))

(defn draw-hero [x y]
  (.beginPath @context)
  (set! (.-fillStyle @context) "green")
  (.moveTo @context (+ (* x 10) (/ 10 2)) (* y 10))
  (.lineTo @context (- (+ (* x 10) 10) (/ 10 2)) (* y 10))
  (.lineTo @context (+ (* x 10) 10) (+ (* y 10) 10))
  (.lineTo @context (* x 10) (+ (* y 10) 10))
  (.closePath @context)
  (.fill @context))
