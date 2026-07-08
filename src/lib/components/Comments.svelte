<script lang=ts>
     import { marked } from "marked";
     import DOMPurify from "dompurify";

     // Icons
     import Send from "$lib/assets/icons/send.svg"
     import Comments from "$lib/assets/icons/beautify/comments.svg"

     let commentInputBox: HTMLTextAreaElement;
     let comment = $state("")
     let parsedComment = $state("")
     
     // "EDIT" || "PREVIEW"
     let commentModeState: string = $state("EDIT")

     async function previewMarkdownComment() {
          let markedResponse = marked.parse(comment).toString();
          let purifiedMarkedResponse = DOMPurify.sanitize(markedResponse)
          parsedComment = purifiedMarkedResponse
     }

</script>

<div class="p-4 my-2 bg-black rounded-2xl md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <h2 class="flex items-center gap-2 mb-3">Comments <span class="text-[10px] text-neutral-500">(supports Markdown!)</span></h2>
     
     <!-- Comment Input -->
     <div class="flex gap-2 flex-col">
          {#if comment}
               <div class="flex gap-1">
                    {#if commentModeState === "EDIT"}
                         <button class="w-1/2 py-1 text-center text-[15px] bg-neutral-700" onclick={() => {commentModeState = "EDIT"}}>Edit</button>
                    {:else}
                         <button class="w-1/2 py-1 text-center text-[15px] bg-neutral-900" onclick={() => {commentModeState = "EDIT"}}>Edit</button>
                    {/if}
                    {#if commentModeState === "PREVIEW"}
                         <button class="w-1/2 py-1 text-center text-[15px] bg-neutral-700" onclick={() => {commentModeState = "PREVIEW"; previewMarkdownComment()}}>Preview</button>
                    {:else}
                         <button class="w-1/2 py-1 text-center text-[15px] bg-neutral-900" onclick={() => {commentModeState = "PREVIEW"; previewMarkdownComment()}}>Preview</button>
                    {/if}
               </div>
          {/if}
          <div class="flex gap-1 rounded">
               {#if commentModeState === "EDIT"}
                    <textarea 
                    placeholder="Enter a comment.."
                    class="bg-neutral-950 flex-1 w-full min-h-30 h-30 resize-none border-none focus:ring-0"
                    bind:this={commentInputBox}
                    bind:value={comment}
                    oninput={() => {commentInputBox.style.height = '0px'; commentInputBox.style.height = commentInputBox.scrollHeight + 'px';}}
                    ></textarea>
               {:else if commentModeState === "PREVIEW"}
                    <div class="bg-neutral-950 flex-1 w-full min-h-30 h-30 py-2 px-3
  prose max-w-none
  text-white
  prose-headings:text-white
  prose-p:text-white
  prose-li:text-white
  prose-strong:text-white
  prose-blockquote:text-white
  prose-th:text-white
  prose-td:text-white

  prose-headings:font-semibold
  prose-h1:text-3xl prose-h1:border-b prose-h1:border-gray-300 prose-h1:pb-2 prose-h1:mb-4
  prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-300 prose-h2:pb-2 prose-h2:mb-3
  prose-a:text-inherit prose-a:underline
  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
  prose-pre:bg-gray-900 prose-pre:text-gray-100
  prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:italic
  prose-table:border prose-table:border-gray-300
  prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:px-3 prose-th:py-2
  prose-td:border prose-td:border-gray-300 prose-td:px-3 prose-td:py-2
  prose-hr:border-gray-300

  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-1
  prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-1
  prose-li:my-1 prose-li:pl-1

  [&_ul_ul]:list-[circle] [&_ul_ul]:mt-1 [&_ul_ul]:mb-1
  [&_ul_ul_ul]:list-[square]
  [&_ol_ol]:list-[lower-alpha] [&_ol_ol]:mt-1 [&_ol_ol]:mb-1
  [&_ol_ol_ol]:list-[lower-roman]

  [&_li>p]:my-0
  [&_li_ul]:pl-5 [&_li_ol]:pl-5

  [&_input[type=checkbox]]:mr-2 [&_input[type=checkbox]]:align-middle [&_input[type=checkbox]]:accent-gray-600
  [&_li:has(input[type=checkbox])]:list-none [&_li:has(input[type=checkbox])]:ml-[-1.5rem]

                    ">
                         {@html parsedComment}
                    </div>
               {/if}
          </div>
          <button class="text-center bg-neutral-900 p-2 px-5 shrink-0">
               <img alt="send" src={Send} class="invert-0 dark:invert m-auto size-7 justify-self-center">
          </button>
     </div>
</div>
