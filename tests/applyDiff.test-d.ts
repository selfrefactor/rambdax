import { expectAssignable, expectError } from 'tsd';
import { applyDiff } from '../index';

const obj = { a: 1, b: 2, c: { x: '12', y: { z: 'a' } } };

expectAssignable(
  applyDiff([{ op: 'remove', path: 'a' }, { op: 'remove', path: 'c.x' }, { op: 'remove', path: 'c.y.z' },],
    obj)
);

expectError(applyDiff([{ op: 'remove', path: 'c.b' },], obj));
expectError(applyDiff([{ op: 'remove', path: 'd' },], obj));
expectError(applyDiff([{ op: 'remove', path: 'x.y' },], obj));

const arr = [{ a: 1 }];

expectAssignable(applyDiff([{ op: 'remove', path: '0' }, { op: 'remove', path: '0.a' }], arr));

expectError(applyDiff([{ op: 'remove', path: 'a' }], arr));
expectError(applyDiff([{ op: 'remove', path: 'a.0' }], arr));


enum Test { A, B, C };
const en = { [Test.A]: 1, [Test.B]: 2, [Test.C]: { nested: true } };

expectAssignable(applyDiff([
  { op: 'remove', path: '0' },
  { op: 'remove', path: `${Test.B}` },
  { op: 'remove', path: `${Test.C}.nested` },
], en));

expectError(applyDiff([{ op: 'remove', path: 0 }], en));
expectError(applyDiff([{ op: 'remove', path: '3' }], en));
expectError(applyDiff([{ op: 'remove', path: `${Test.C}.neste` }], en));

const superNested = { a: { b: { c: { d: { e: { f: { g: { h: { i: { j: { k: { l: { m: { n: { o: { p: { q: 'hey' }}}}}}}}}}}}}}}}};

expectAssignable(applyDiff([
  { op: 'remove', path: 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p' },
  { op: 'remove', path: 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q' as 'a' }
], superNested));

expectError(applyDiff([{ op: 'remove', path: 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q' }, /* Needs to be cast */], superNested));
