type="text/javascript"

VerletJS.prototype.spider = function(origin) {
    var i;
    var legSeg1Stiffness = 0.99;
    var legSeg2Stiffness = 0.99;
    var legSeg3Stiffness = 0.99;
    var legSeg4Stiffness = 0.99;
    
    var joint1Stiffness = 1;
    var joint2Stiffness = 0.4;
    var joint3Stiffness = 0.9;
    
    var bodyStiffness = 1;
    var bodyJointStiffness = 1;
    
    var composite = new this.Composite();
    composite.legs = [];
    
    
    composite.thorax = new Particle(origin);
    composite.head = new Particle(origin.add(new Vec2(0,-5)));
    composite.abdomen = new Particle(origin.add(new Vec2(0,10)));
    
    composite.particles.push(composite.thorax);
    composite.particles.push(composite.head);
    composite.particles.push(composite.abdomen);
    
    composite.constraints.push(new DistanceConstraint(composite.head, composite.thorax, bodyStiffness));
    
    
    composite.constraints.push(new DistanceConstraint(composite.abdomen, composite.thorax, bodyStiffness));
    composite.constraints.push(new AngleConstraint(composite.abdomen, composite.thorax, composite.head, 0.4));
    
    
    // legs
    for (i=0;i<4;++i) {
        composite.particles.push(new Particle(composite.particles[0].pos.add(new Vec2(3,(i-1.5)*3))));
        composite.particles.push(new Particle(composite.particles[0].pos.add(new Vec2(-3,(i-1.5)*3))));
        
        var len = composite.particles.length;
        
        composite.constraints.push(new DistanceConstraint(composite.particles[len-2], composite.thorax, legSeg1Stiffness));
        composite.constraints.push(new DistanceConstraint(composite.particles[len-1], composite.thorax, legSeg1Stiffness));
        
        
        var lenCoef = 1;
        if (i == 1 || i == 2)
            lenCoef = 0.7;
        else if (i == 3)
            lenCoef = 0.9;
        
        composite.particles.push(new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*30)).normal().mutableScale(20*lenCoef))));
        composite.particles.push(new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*30)).normal().mutableScale(20*lenCoef))));
        
        len = composite.particles.length;
        composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg2Stiffness));
        composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg2Stiffness));
        
        composite.particles.push(new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*50)).normal().mutableScale(20*lenCoef))));
        composite.particles.push(new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*50)).normal().mutableScale(20*lenCoef))));
        
        len = composite.particles.length;
        composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg3Stiffness));
        composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg3Stiffness));
        
        
        var rightFoot = new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*100)).normal().mutableScale(12*lenCoef)));
        var leftFoot = new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*100)).normal().mutableScale(12*lenCoef)))
        composite.particles.push(rightFoot);
        composite.particles.push(leftFoot);
        
        composite.legs.push(rightFoot);
        composite.legs.push(leftFoot);
        
        len = composite.particles.length;
        composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg4Stiffness));
        composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg4Stiffness));
        
        
        composite.constraints.push(new AngleConstraint(composite.particles[len-6], composite.particles[len-4], composite.particles[len-2], joint3Stiffness));
        composite.constraints.push(new AngleConstraint(composite.particles[len-6+1], composite.particles[len-4+1], composite.particles[len-2+1], joint3Stiffness));
        
        composite.constraints.push(new AngleConstraint(composite.particles[len-8], composite.particles[len-6], composite.particles[len-4], joint2Stiffness));
        composite.constraints.push(new AngleConstraint(composite.particles[len-8+1], composite.particles[len-6+1], composite.particles[len-4+1], joint2Stiffness));
        
        composite.constraints.push(new AngleConstraint(composite.particles[0], composite.particles[len-8], composite.particles[len-6], joint1Stiffness));
        composite.constraints.push(new AngleConstraint(composite.particles[0], composite.particles[len-8+1], composite.particles[len-6+1], joint1Stiffness));
        
        composite.constraints.push(new AngleConstraint(composite.particles[1], composite.particles[0], composite.particles[len-8], bodyJointStiffness));
        composite.constraints.push(new AngleConstraint(composite.particles[1], composite.particles[0], composite.particles[len-8+1], bodyJointStiffness));
    }
    
    this.composites.push(composite);
    return composite;
}

VerletJS.prototype.spiderweb = function(origin, radius, segments, depth) {
    var stiffness = 0.6;
    var tensor = 0.3;
    var stride = (2*Math.PI)/segments;
    var n = segments*depth;
    var radiusStride = radius/n;
    var i, c;

    var composite = new this.Composite();

    // particles
    for (i=0;i<n;++i) {
        var theta = i*stride + Math.cos(i*0.4)*0.05 + Math.cos(i*0.05)*0.2;
        var shrinkingRadius = radius - radiusStride*i + Math.cos(i*0.1)*20;
        
        var offy = Math.cos(theta*2.1)*(radius/depth)*0.2;
        composite.particles.push(new Particle(new Vec2(origin.x + Math.cos(theta)*shrinkingRadius, origin.y + Math.sin(theta)*shrinkingRadius + offy)));
    }
    
    for (i=0;i<segments;i+=4)
        composite.pin(i);

    // constraints
    for (i=0;i<n-1;++i) {
        // neighbor
        composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[i+1], stiffness));
        
        // span rings
        var off = i + segments;
        if (off < n-1)
            composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[off], stiffness));
        else
            composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[n-1], stiffness));
    }
    
    
    composite.constraints.push(new DistanceConstraint(composite.particles[0], composite.particles[segments-1], stiffness));
    
    for (c in composite.constraints)
        composite.constraints[c].distance *= tensor;

    this.composites.push(composite);
    return composite;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

VerletJS.prototype.crawl = function(leg) {
    
    var stepRadius = 100;
    var minStepRadius = 35;
    
    var spiderweb = this.composites[0];
    var spider = this.composites[1];
    
    var theta = spider.particles[0].pos.angle2(spider.particles[0].pos.add(new Vec2(1,0)), spider.particles[1].pos);

    var boundry1 = (new Vec2(Math.cos(theta), Math.sin(theta)));
    var boundry2 = (new Vec2(Math.cos(theta+Math.PI/2), Math.sin(theta+Math.PI/2)));
    
    
    var flag1 = leg < 4 ? 1 : -1;
    var flag2 = leg%2 == 0 ? 1 : 0;
    
    var paths = [];
    
    var i;
    for (i in spiderweb.particles) {
        if (
            spiderweb.particles[i].pos.sub(spider.particles[0].pos).dot(boundry1)*flag1 >= 0
            && spiderweb.particles[i].pos.sub(spider.particles[0].pos).dot(boundry2)*flag2 >= 0
        ) {
            var d2 = spiderweb.particles[i].pos.dist2(spider.particles[0].pos);
            
            if (!(d2 >= minStepRadius*minStepRadius && d2 <= stepRadius*stepRadius))
                continue;

            var leftFoot = false;
            var j;
            for (j in spider.constraints) {
                var k;
                for (k=0;k<8;++k) {
                    if (
                        spider.constraints[j] instanceof DistanceConstraint
                        && spider.constraints[j].a == spider.legs[k]
                        && spider.constraints[j].b == spiderweb.particles[i])
                    {
                        leftFoot = true;
                    }
                }
            }
            
            if (!leftFoot)
                paths.push(spiderweb.particles[i]);
        }
    }
    
    for (i in spider.constraints) {
        if (spider.constraints[i] instanceof DistanceConstraint && spider.constraints[i].a == spider.legs[leg]) {
            spider.constraints.splice(i, 1);
            break;
        }
    }
    
    if (paths.length > 0) {
        shuffle(paths);
        spider.constraints.push(new DistanceConstraint(spider.legs[leg], paths[0], 1, 0));
    }
}

window.onload = function() {
    var canvas = document.getElementById("scratch");

    // canvas dimensions
    var width = parseInt(canvas.style.width);
    var height = parseInt(canvas.style.height);

    // retina
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width*dpr;
    canvas.height = height*dpr;
    canvas.getContext("2d").scale(dpr, dpr);

    // simulation
    var sim = new VerletJS(width, height, canvas);
    
    // entities
    var spiderweb = sim.spiderweb(new Vec2(width/2,height/2), Math.min(width, height)/2, 20, 7);

    var spider = sim.spider(new Vec2(width/2,-300));    
    
    
    spiderweb.drawParticles = function(ctx, composite) {
        var i;
        for (i in composite.particles) {
            var point = composite.particles[i];
            ctx.beginPath();
            ctx.arc(point.pos.x, point.pos.y, 1.3, 0, 2*Math.PI);
            ctx.fillStyle = "#2dad8f";
            ctx.fill();
        }
    }
        
        
    spider.drawConstraints = function(ctx, composite) {
        var i;

        ctx.beginPath();
        ctx.arc(spider.head.pos.x, spider.head.pos.y, 4, 0, 2*Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(spider.thorax.pos.x, spider.thorax.pos.y, 4, 0, 2*Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(spider.abdomen.pos.x, spider.abdomen.pos.y, 8, 0, 2*Math.PI);
        ctx.fill();
        
        for (i=3;i<composite.constraints.length;++i) {
            var constraint = composite.constraints[i];
            if (constraint instanceof DistanceConstraint) {
                ctx.beginPath();
                ctx.moveTo(constraint.a.pos.x, constraint.a.pos.y);
                ctx.lineTo(constraint.b.pos.x, constraint.b.pos.y);
                
                // draw legs
                if (
                    (i >= 2 && i <= 4)
                    || (i >= (2*9)+1 && i <= (2*9)+2)
                    || (i >= (2*17)+1 && i <= (2*17)+2)
                    || (i >= (2*25)+1 && i <= (2*25)+2)
                ) {
                    ctx.save();
                    constraint.draw(ctx);
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.restore();
                } else if (
                    (i >= 4 && i <= 6)
                    || (i >= (2*9)+3 && i <= (2*9)+4)
                    || (i >= (2*17)+3 && i <= (2*17)+4)
                    || (i >= (2*25)+3 && i <= (2*25)+4)
                ) {
                    ctx.save();
                    constraint.draw(ctx);
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.restore();
                } else if (
                    (i >= 6 && i <= 8)
                    || (i >= (2*9)+5 && i <= (2*9)+6)
                    || (i >= (2*17)+5 && i <= (2*17)+6)
                    || (i >= (2*25)+5 && i <= (2*25)+6)
                ) {
                    ctx.save();
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    ctx.restore();
                } else {
                    //cor das pontas da perna
                    ctx.strokeStyle = "#ff2400";
                    ctx.stroke();
                }
            }
        }
    }
    
    spider.drawParticles = function(ctx, composite) {
    }
    
    // animation loop
    var legIndex = 0;
    var loop = function() {
        if (Math.floor(Math.random()*4) == 0) {
            sim.crawl(((legIndex++)*3)%8);
        }
        
        sim.frame(16);
        sim.draw();
        requestAnimFrame(loop);
    };

    loop();
};