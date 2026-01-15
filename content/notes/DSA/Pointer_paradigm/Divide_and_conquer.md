# Divide And Conquer

---

Divide and conquer paradigm works by the idea that a bigger problem can be solved by solving some smaller problems. Note that we can consider lots of problem to be solvable by this idea. For example the problem of finding the element can be divided into two smaller problems of finding element in first and second half respectively.

The approach works in three steps: **divide** the main problem into independent subproblems of the same type, **conquer** each subproblem by solving it recursively, and **combine** the solutions of the subproblems to form the final answer.

Many classical algorithms use Divide and Conquer, such as **Merge Sort**, **Quick Sort**, **Binary Search**, **Strassen’s Matrix Multiplication**, and algorithms for finding closest pair of points.

Sorting a linked linke without additonal space can be done using divide and coquer just like merge sort. The idea is to first ivide the list into two equal parts and then merge the two sorted arrays giving overall time complexity of `O(nlogn)`

```java
class Solution {

    ListNode sort(ListNode h) {
        if (h == null || h.next == null) return h;

        ListNode s = h, f = h, p = null;
        while (f != null && f.next != null) {
            p = s;
            s = s.next;
            f = f.next.next;
        }

        p.next = null;

        ListNode l = sort(h);
        ListNode r = sort(s);

        ListNode ans = new ListNode(0), t = ans;

        while (l != null && r != null) {
            if (l.val < r.val) {
                t.next = l;
                l = l.next;
            } else {
            t.next = r;
            r = r.next;
        }
        t = t.next;
    }

    t.next = (l != null) ? l : r;
    return ans.next;
}

public ListNode sortList(ListNode head) {
    return sort(head);
}
}

```

Another problem is mergeing k lists. Again the idea is to divide the collections of lists into gps of 2 and use the divide approach to combine them.

```java
class Solution {

    ListNode merge(ListNode l1,ListNode l2){
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while(l1!=null && l2!=null){
            if(l1.val<l2.val){
                curr.next = l1;
                l1 = l1.next;
            }else{
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    curr.next = (l1!=null?l1:l2);
    return dummy.next;
}

ListNode solve(int l,int r,ListNode[] lists){
    if(l==r){return lists[l];}
    if(l+1==r){return merge(lists[l],lists[r]);}

    int mid = (l+r)/2;
    return merge(solve(l,mid,lists),solve(mid+1,r,lists));
}

public ListNode mergeKLists(ListNode[] lists) {
    if(lists.length==0)return null;
    if(lists.length==1)return lists[0];
    return solve(0,lists.length-1,lists);
}
}

```
