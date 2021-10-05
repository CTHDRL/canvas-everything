// https://cwestblog.com/2014/03/14/javascript-getting-all-text-nodes/
export const getTextNodesIn = (elem: HTMLElement) => {
    const textNodes = [] as Node[]
    if (elem) {
        for (let node of Array.from(elem.childNodes)) {
            const nodeType = node.nodeType

            if (nodeType === Node.TEXT_NODE) {
                textNodes.push(node)
            }
            else if (nodeType === Node.ELEMENT_NODE
                || nodeType === Node.DOCUMENT_NODE
                || nodeType == Node.DOCUMENT_FRAGMENT_NODE
            ) {
                textNodes.push(...getTextNodesIn(node as HTMLElement));
            }
        }
    }
    return textNodes
}
