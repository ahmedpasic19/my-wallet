'use client'

import { RecordType } from '@prisma/client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteRecord } from '../../actions'

import { Button } from '@/components/ui/button'
import MainDialog from '@/components/ui/main-dialog'

type TProps = {
   type: RecordType
}

const DeleteRecordDialog = ({ type }: TProps) => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('dRec') ? true : false
   const paramsType = searchParams.get('type')?.toUpperCase() as RecordType

   const handleDelete = async () => {
      try {
         await deleteRecord(searchParams.get('dRec')!)

         router.back()

         toast.success('Record deleted')
      } catch (error) {
         toast.error('An error accured')
      }
   }

   return (
      <MainDialog
         title="Delete record"
         open={isOpen && paramsType === type}
         onOpenChange={() => (isOpen ? router.back() : router.push('?dRec=true'))}
         noBtn
      >
         <div className="flex gap-2 w-full justify-center">
            <Button variant="outline" onClick={() => router.back()}>
               Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
         </div>
      </MainDialog>
   )
}

export default DeleteRecordDialog