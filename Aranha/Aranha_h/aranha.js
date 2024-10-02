"use strict";

let t = window.innerWidth,
  s = window.innerHeight,
  e = Math.max(t, s);

(t = e), (s = e);
/*
let a = Math.min(t, s) / 3;

!(function () {
  let t = new CircleType(document.getElementById("title1"));
  t.radius(a).dir(1), t.forceHeight(!0);
})(),*/
  (function () {
    var e, a, n, i, r, c, o, l, p;
    (VerletJS.prototype.spider = function (t) {
      var s,
        e,
        a,
        n,
        i,
        r = 0.99,
        c = 0.99,
        o = 0.99,
        l = 0.99,
        p = 1,
        h = 0.4,
        w = 0.9,
        u = 1,
        d = 1,
        f = new this.Composite();
      for (
        f.legs = [],
          f.thorax = new Particle(t),
          f.head = new Particle(t.add(new Vec2(0, -5))),
          f.abdomen = new Particle(t.add(new Vec2(0, 10))),
          f.particles.push(f.thorax),
          f.particles.push(f.head),
          f.particles.push(f.abdomen),
          f.constraints.push(new DistanceConstraint(f.head, f.thorax, u)),
          f.constraints.push(new DistanceConstraint(f.abdomen, f.thorax, u)),
          f.constraints.push(
            new AngleConstraint(f.abdomen, f.thorax, f.head, 0.4)
          ),
          s = 0;
        s < 4;
        ++s
      )
        f.particles.push(
          new Particle(f.particles[0].pos.add(new Vec2(3, 3 * (s - 1.5))))
        ),
          f.particles.push(
            new Particle(f.particles[0].pos.add(new Vec2(-3, 3 * (s - 1.5))))
          ),
          (e = f.particles.length),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 2], f.thorax, r)
          ),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 1], f.thorax, r)
          ),
          (a = 1),
          1 == s || 2 == s ? (a = 0.7) : 3 == s && (a = 0.9),
          f.particles.push(
            new Particle(
              f.particles[e - 2].pos.add(
                new Vec2(20, 30 * (s - 1.5)).normal().mutableScale(20 * a)
              )
            )
          ),
          f.particles.push(
            new Particle(
              f.particles[e - 1].pos.add(
                new Vec2(-20, 30 * (s - 1.5)).normal().mutableScale(20 * a)
              )
            )
          ),
          (e = f.particles.length),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 4], f.particles[e - 2], c)
          ),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 3], f.particles[e - 1], c)
          ),
          f.particles.push(
            new Particle(
              f.particles[e - 2].pos.add(
                new Vec2(20, 50 * (s - 1.5)).normal().mutableScale(20 * a)
              )
            )
          ),
          f.particles.push(
            new Particle(
              f.particles[e - 1].pos.add(
                new Vec2(-20, 50 * (s - 1.5)).normal().mutableScale(20 * a)
              )
            )
          ),
          (e = f.particles.length),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 4], f.particles[e - 2], o)
          ),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 3], f.particles[e - 1], o)
          ),
          (n = new Particle(
            f.particles[e - 2].pos.add(
              new Vec2(20, 100 * (s - 1.5)).normal().mutableScale(12 * a)
            )
          )),
          (i = new Particle(
            f.particles[e - 1].pos.add(
              new Vec2(-20, 100 * (s - 1.5)).normal().mutableScale(12 * a)
            )
          )),
          f.particles.push(n),
          f.particles.push(i),
          f.legs.push(n),
          f.legs.push(i),
          (e = f.particles.length),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 4], f.particles[e - 2], l)
          ),
          f.constraints.push(
            new DistanceConstraint(f.particles[e - 3], f.particles[e - 1], l)
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[e - 6],
              f.particles[e - 4],
              f.particles[e - 2],
              w
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[e - 6 + 1],
              f.particles[e - 4 + 1],
              f.particles[e - 2 + 1],
              w
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[e - 8],
              f.particles[e - 6],
              f.particles[e - 4],
              h
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[e - 8 + 1],
              f.particles[e - 6 + 1],
              f.particles[e - 4 + 1],
              h
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[0],
              f.particles[e - 8],
              f.particles[e - 6],
              p
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[0],
              f.particles[e - 8 + 1],
              f.particles[e - 6 + 1],
              p
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[1],
              f.particles[0],
              f.particles[e - 8],
              d
            )
          ),
          f.constraints.push(
            new AngleConstraint(
              f.particles[1],
              f.particles[0],
              f.particles[e - 8 + 1],
              d
            )
          );
      return this.composites.push(f), f;
    }),
      (VerletJS.prototype.spiderweb = function (t, s, e, a) {
        var n,
          i,
          r,
          c,
          o,
          l,
          p = 0.6,
          h = 0.3,
          w = (2 * Math.PI) / e,
          u = e * a,
          d = s / u,
          f = new this.Composite();
        for (n = 0; n < u; ++n)
          (r = n * w + 0.05 * Math.cos(0.4 * n) + 0.2 * Math.cos(0.05 * n)),
            (c = s - d * n + 20 * Math.cos(0.1 * n)),
            (o = Math.cos(2.1 * r) * (s / a) * 0.2),
            f.particles.push(
              new Particle(
                new Vec2(t.x + Math.cos(r) * c, t.y + Math.sin(r) * c + o)
              )
            );
        for (n = 0; n < e; n += 4) f.pin(n);
        for (n = 0; n < u - 1; ++n)
          f.constraints.push(
            new DistanceConstraint(f.particles[n], f.particles[n + 1], p)
          ),
            (l = n + e) < u - 1
              ? f.constraints.push(
                  new DistanceConstraint(f.particles[n], f.particles[l], p)
                )
              : f.constraints.push(
                  new DistanceConstraint(f.particles[n], f.particles[u - 1], p)
                );
        for (i in (f.constraints.push(
          new DistanceConstraint(f.particles[0], f.particles[e - 1], p)
        ),
        f.constraints))
          f.constraints[i].distance *= h;
        return this.composites.push(f), f;
      }),
      (VerletJS.prototype.crawl = function (t) {
        var s,
          e,
          a,
          n,
          i,
          r = 100,
          c = 35,
          o = this.composites[0],
          l = this.composites[1],
          p = l.particles[0].pos.angle2(
            l.particles[0].pos.add(new Vec2(1, 0)),
            l.particles[1].pos
          ),
          h = new Vec2(Math.cos(p), Math.sin(p)),
          w = new Vec2(Math.cos(p + Math.PI / 2), Math.sin(p + Math.PI / 2)),
          u = t < 4 ? 1 : -1,
          d = t % 2 == 0 ? 1 : 0,
          f = [];
        for (s in o.particles)
          if (
            o.particles[s].pos.sub(l.particles[0].pos).dot(h) * u >= 0 &&
            o.particles[s].pos.sub(l.particles[0].pos).dot(w) * d >= 0
          ) {
            if (
              !(
                (e = o.particles[s].pos.dist2(l.particles[0].pos)) >= c * c &&
                e <= r * r
              )
            )
              continue;
            for (n in ((a = !1), l.constraints))
              for (i = 0; i < 8; ++i)
                l.constraints[n] instanceof DistanceConstraint &&
                  l.constraints[n].a == l.legs[i] &&
                  l.constraints[n].b == o.particles[s] &&
                  (a = !0);
            a || f.push(o.particles[s]);
          }
        for (s in l.constraints)
          if (
            l.constraints[s] instanceof DistanceConstraint &&
            l.constraints[s].a == l.legs[t]
          ) {
            l.constraints.splice(s, 1);
            break;
          }
        f.length > 0 &&
          (!(function (t) {
            for (
              var s, e, a = t.length;
              a;
              s = parseInt(Math.random() * a), e = t[--a], t[a] = t[s], t[s] = e
            );
          })(f),
          l.constraints.push(new DistanceConstraint(l.legs[t], f[0], 1, 0)));
      }),
      (e = document.getElementById("scratch")),
      (a = t),
      (n = s),
      (i = window.devicePixelRatio || 1),
      (e.width = a * i),
      (e.height = n * i),
      e.getContext("2d").scale(i, i),
      (c = (r = new VerletJS(a, n, e)).spiderweb(
        new Vec2(a / 2, n / 2),
        Math.min(a, n) / 2,
        20,
        7
      )),
      (o = r.spider(new Vec2(a / 2, -300))),
      (c.drawParticles = function (t, s) {
        var e, a;
        for (e in s.particles)
          (a = s.particles[e]),
            t.beginPath(),
            t.arc(a.pos.x, a.pos.y, 1.3, 0, 2 * Math.PI),
            (t.fillStyle = "#fff"),
            t.fill();
      }),
      (o.drawConstraints = function (t, s) {
        var e, a;
        for (
          t.beginPath(),
            t.arc(o.head.pos.x, o.head.pos.y, 4, 0, 2 * Math.PI),
            t.fillStyle = "red",
            t.fill(),
            t.beginPath(),
            t.arc(o.thorax.pos.x, o.thorax.pos.y, 4, 0, 2 * Math.PI),
            t.fill(),
            t.beginPath(),
            t.arc(o.abdomen.pos.x, o.abdomen.pos.y, 8, 0, 2 * Math.PI),
            t.fill(),
            e = 3;
          e < s.constraints.length;
          ++e
        )
          (a = s.constraints[e]) instanceof DistanceConstraint &&
            (t.beginPath(),
            t.moveTo(a.a.pos.x, a.a.pos.y),
            t.lineTo(a.b.pos.x, a.b.pos.y),
            (e >= 2 && e <= 4) ||
            (e >= 19 && e <= 20) ||
            (e >= 35 && e <= 36) ||
            (e >= 51 && e <= 52)
              ? (t.save(),
                a.draw(t),
                (t.strokeStyle = "red"),
                (t.lineWidth = 3),
                t.stroke(),
                t.restore())
              : (e >= 4 && e <= 6) ||
                (e >= 21 && e <= 22) ||
                (e >= 37 && e <= 38) ||
                (e >= 53 && e <= 54)
              ? (t.save(),
                a.draw(t),
                (t.strokeStyle = "red"),
                (t.lineWidth = 2),
                t.stroke(),
                t.restore())
              : (e >= 6 && e <= 8) ||
                (e >= 23 && e <= 24) ||
                (e >= 39 && e <= 40) ||
                (e >= 55 && e <= 56)
              ? (t.save(),
                (t.strokeStyle = "red"),
                (t.lineWidth = 1.5),
                t.stroke(),
                t.restore())
              : ((t.strokeStyle = "red"), t.stroke()));
      }),
      (o.drawParticles = function () {}),
      (l = 0),
      (p = function () {
        0 == Math.floor(4 * Math.random()) && r.crawl((3 * l++) % 8),
          r.frame(16),
          r.draw(),
          requestAnimFrame(p);
      })();
  })();
